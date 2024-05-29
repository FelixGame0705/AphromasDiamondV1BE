import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsEntity } from "src/entities/accounts.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
@Module({
    imports: [TypeOrmModule.forFeature([AccountsEntity])],
    controllers: [AuthController],
    providers: [AuthService, {
        useClass: AuthRepository,
        provide: 'IAuthRepository'
    }]
})
export class AuthModule{}