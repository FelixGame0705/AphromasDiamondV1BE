import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JewelryTypeEntity } from "../../entities/jewelryType.entity";
import { JewelryTypeController } from "./jewelrytype.controller";
import { JewelryTypeService } from "./jewelrytype.service";
import { JewelryTypeRepository } from "./jewelrytype.repository";

@Module({
    imports: [TypeOrmModule.forFeature([JewelryTypeEntity])],
    controllers: [JewelryTypeController],
    providers: [JewelryTypeService, {
        useClass:  JewelryTypeRepository,
        provide: 'JewelryTypeRepository'
    }]
})
export class JewelryTypeModule{

}