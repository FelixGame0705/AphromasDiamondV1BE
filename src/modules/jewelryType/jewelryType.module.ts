import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { JewelryTypeController } from "./jewelryType.controller";
import { JewelryTypeService } from "./jewelryType.service";
import { JewelryTypeRepository } from "./jewelryType.repository";

@Module({
    imports: [TypeOrmModule.forFeature([JewelryTypeEntity])],
    controllers: [JewelryTypeController],
    providers: [JewelryTypeService, {
        useClass:  JewelryTypeRepository,
        provide: 'IJewelryTypeRepository'
    }]
})
export class JewelryTypeModule{

}