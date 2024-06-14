import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SizeMatchShellEntity } from "../../entities/sizeMatchShell.entity";
import { SizeMatchShellRepository } from "./sizeMatchShell.repository";
import { SizeMatchShellService } from "./sizeMatchShell.service";
import { SizeMatchShellController } from "./sizeMatchShell.controller";

@Module({
    imports: [TypeOrmModule.forFeature([SizeMatchShellEntity])],
    controllers: [SizeMatchShellController],
    providers: [SizeMatchShellService, {
        useClass: SizeMatchShellRepository,
        provide: 'ISizeMatchShellRepository'
    }]
})
export class SizeMatchShellModule{

}