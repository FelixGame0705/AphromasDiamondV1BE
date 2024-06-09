import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthPayloadCustomerDTO, AuthPayloadDTO, AuthPermission, AuthResponseDTO, CustomerInforDTO } from "src/dto/auth.dto";
import { AccountsEntity } from "src/entities/accounts.entity";
import { IAuthRepository } from "src/interfaces/IAuthRepository";
import { BaseEntity, DataSource, FindOptionsWhere, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "src/global/globalEnum";
import { JwtService } from "@nestjs/jwt";
import { CustomerEntity } from "src/entities/customer.entity";

@Injectable()
export class AuthRepository implements IAuthRepository {

    constructor(
        @InjectRepository(AccountsEntity)
        protected readonly accountRepository: Repository<AccountsEntity>,
        @InjectRepository(CustomerEntity)
        protected readonly customerRepository: Repository<CustomerEntity>,
        private jwtService: JwtService,
        private dataSource: DataSource
    ) { }
    findByID(id: number): Promise<AuthResponseDTO> {
        throw new Error("Method not implemented.");
    }
    async signIn(body: AuthPayloadDTO): Promise<boolean | AuthPermission> {
        const {Username, Password} = body;
        const userAuth = await this.accountRepository.findOne({where: {Username}});
        if(!userAuth) return false;

        const isMatch = await bcrypt.compare(Password, userAuth.Password);
        if(!isMatch) return false;
        const payload = {...new AuthResponseDTO(userAuth)}
        return new AuthPermission({
            id: userAuth.AccountID,
            token: await this.jwtService.signAsync(payload),
            expiredTime: 900000
        })
    }
    async signUp(body: AuthPayloadDTO): Promise<AuthResponseDTO> {
        const{Name, PhoneNumber,Username, Password, Role} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        return this.accountRepository.save({
            Name,
            PhoneNumber,
            Username,
            Password: hash,
            Role
        })
    }

    async signUpCustomer(body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO> {
        const { Name, PhoneNumber, Username, Password, Birthday, Gender, Address } = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);

        // Start a new transaction
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Save the account information
            const account = this.accountRepository.create({
                Name,
                PhoneNumber,
                Username,
                Password: hash,
                Role: Role.Customer,
            });
            await queryRunner.manager.save(account);

            // Save the customer information
            const customer = this.customerRepository.create({
                Birthday,
                Gender,
                Address,
                CustomerID: account.AccountID,
            });
            await queryRunner.manager.save(customer);

            // Commit the transaction
            await queryRunner.commitTransaction();

            // Return the account information
            return new AuthResponseDTO(account);
        } catch (error) {
            // If any error occurs, rollback the transaction
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    }

    async updateAccount(id:number,body: AuthPayloadDTO): Promise<AuthResponseDTO | boolean>{
        const{Name, PhoneNumber,Username, Password, Role} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        await this.accountRepository.update(id, {
            Name,
            PhoneNumber,
            Username,
            Password: hash,
            Role
        });
        return await this.findById(id);
    }

    async updateCustomer(id:number, body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean>{
        const{Name, PhoneNumber,Password, Birthday, Address, Gender} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        await this.accountRepository.update(id, {
            Name,
            PhoneNumber,
            Password: hash,
        });
        await this.customerRepository.update(id, {
            Birthday, Address, Gender
        })
        return await this.findById(id);
    }

    getIdField(){
        return "AccountID"
    }

    async findById(id: number): Promise<AuthResponseDTO>{
        const idField = this.getIdField();
        return await this.accountRepository.findOne( {where: {[idField]:id} as FindOptionsWhere<BaseEntity>});
    }

    async findByUsername(username: string){
        const idField = this.getIdField();
        return await this.accountRepository.findOne( {where: {Username:username} as FindOptionsWhere<BaseEntity>});
    }
}