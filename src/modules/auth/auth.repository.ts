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
    detailAccount(id: number): Promise<AuthResponseDTO> {
        throw new Error("Method not implemented.");
    }

    async signIn(body: AuthPayloadDTO): Promise<boolean | AuthPermission> {
        const { Email: Email, Password } = body;
        const userAuth = await this.accountRepository.findOne({ where: { Email } });
        if (!userAuth) return false;

        const isMatch = await bcrypt.compare(Password, userAuth.Password);
        if (!isMatch) return false;
        const payload = { ...new AuthResponseDTO(userAuth) }
        return new AuthPermission({
            id: userAuth.AccountID,
            token: await this.jwtService.signAsync(payload),
            expiredTime: 3000000
        })
    }

    async signUp(body: AuthPayloadDTO): Promise<AuthResponseDTO> {
        const { Name, PhoneNumber, Email, Password, Role } = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        return this.accountRepository.save({
            Name,
            PhoneNumber,
            Email,
            Password: hash,
            Role
        })
    }

    async signUpCustomer(body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO> {
        const { Name, PhoneNumber, Email, Password, Birthday, Gender, Address } = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);

        // Start a new transaction
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Save the account information


            // Save the customer information
            const customer = this.customerRepository.create({
                Birthday,
                Gender,
                Address
            });
            await queryRunner.manager.save(customer);

            const account = this.accountRepository.create({
                Name,
                PhoneNumber,
                Email,
                Password: hash,
                Role: Role.Customer,
                CustomerID: customer.CustomerID
            });
            await queryRunner.manager.save(account);
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

    async updateAccount(id: number, body: AuthPayloadDTO): Promise<AuthResponseDTO | boolean> {
        const { Name, PhoneNumber, Email, Password, Role } = body;
        const salt = await bcrypt.genSalt();
        let hash = null
        if(Password!=null)
        hash = await bcrypt.hash(Password, salt);

        if (Name === null && PhoneNumber === null && Email === null && Password === null && Role !== null) {
            await this.accountRepository.update(id, {
                Role
            });
        }
        else if (Role !== null) {
            await this.accountRepository.update(id, {
                Name,
                PhoneNumber,
                Email,
                Password: hash,
                Role
            });
        }
        return await this.findById(id);
    }

    async updateCustomer(id: number, body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean> {
        const { Name, PhoneNumber, Password, Birthday, Address, Gender } = body;
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

    getIdField() {
        return "AccountID"
    }
    async findById(id: number): Promise<AuthResponseDTO> {
        const idField = this.getIdField();
        return await this.accountRepository.findOne({ where: { [idField]: id } as FindOptionsWhere<BaseEntity> });
    }
    async findByIdCustomer(id: number): Promise<AuthPayloadCustomerDTO> {
        const idField = this.getIdField();

        let account = await this.accountRepository.findOne({ where: { ['AccountID']: id } as FindOptionsWhere<BaseEntity> });
        let customer = await this.customerRepository.findOne({ where: { ['CustomerID']: account.CustomerID } as FindOptionsWhere<BaseEntity> });
        return {
            CustomerID: customer.CustomerID,
            AccountID: account.AccountID,
            Name: account.Name,
            PhoneNumber: account.PhoneNumber,
            Email: account.Email,
            Password: account.Password,
            Birthday: customer.Birthday,
            Gender: customer.Gender,
            Address: customer.Address
        }
    }

    async findByUsername(email: string) {
        const idField = this.getIdField();
        return await this.accountRepository.findOne({ where: { Email: email } as FindOptionsWhere<BaseEntity> });
    }

    async findRelationById(id: number): Promise<AuthResponseDTO> {
        return await this.accountRepository.findOne({ where: { AccountID: id } as FindOptionsWhere<BaseEntity> });
    }


    async findAllAccounts(): Promise<AuthResponseDTO[]> {
        return await this.accountRepository.find();
    }

    async deleteAccount(id: number): Promise<boolean> {
        try {
            const result = await this.accountRepository.delete(id);
            return result.affected > 0;
        } catch (error) {
            console.error("Error deleting account:", error);
            return false;
        }
    }

    async deleteCustomer(id: number): Promise<boolean> {
        try {
            // First delete the customer record associated with the account
            await this.customerRepository.delete(id);

            // Then delete the account itself
            const result = await this.accountRepository.delete(id);
            return result.affected > 0;
        } catch (error) {
            console.error("Error deleting customer:", error);
            return false;
        }
    }
}