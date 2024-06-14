import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShellEntity } from "../../entities/shell.entity";
import { ShellController } from "./shell.controller";
import { ShellRepository } from "./shell.repository";
import { ShellService } from "./shell.service";

@Module({
    imports: [TypeOrmModule.forFeature([ShellEntity])],
    controllers: [ShellController],
    providers: [ShellService, {
        useClass: ShellRepository,
        provide: 'IShellRepository'
    }]
})
export class ShellModule{

}