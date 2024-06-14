import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { AccountsEntity } from "../../entities/accounts.entity";
import { CustomerEntity } from "../../entities/customer.entity";
@Module({
    imports: [TypeOrmModule.forFeature([AccountsEntity, CustomerEntity])],
    controllers: [AuthController],
    providers: [AuthService, {
        useClass: AuthRepository,
        provide: 'IAuthRepository'
    }
]
})
export class AuthModule{}