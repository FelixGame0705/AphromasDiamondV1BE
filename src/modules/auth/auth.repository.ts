import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthPayloadDTO, AuthPermission, AuthResponseDTO } from "src/dto/auth.dto";
import { AccountsEntity } from "src/entities/accounts.entity";
import { IAuthRepository } from "src/interfaces/IAuthRepository";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "src/global/globalEnum";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository implements IAuthRepository {

    constructor(
        @InjectRepository(AccountsEntity)
        protected readonly repository: Repository<AccountsEntity>,
        private jwtService: JwtService,
    ) { }
    async signIn(body: AuthPayloadDTO): Promise<boolean | AuthPermission> {
        const {Username, Password} = body;
        const userAuth = await this.repository.findOne({where: {Username}});
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
        const{Name, PhoneNumber,Username, Password} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        return this.repository.save({
            Name,
            PhoneNumber,
            Username,
            Password: hash,
            Role: Role.Customer
        })
    }
}