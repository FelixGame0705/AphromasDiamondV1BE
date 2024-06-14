import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiamondEntity } from "../../entities/diamond.entity";
import { DiamondController } from "./diamond.controller";
import { DiamondService } from "./diamond.service";
import { DiamondRepository } from "./diamond.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DiamondEntity])],
    controllers: [DiamondController],
    providers: [DiamondService, {
        useClass: DiamondRepository,
        provide: 'IDiamondRepository'
    }]
})
export class DiamondModule{

}