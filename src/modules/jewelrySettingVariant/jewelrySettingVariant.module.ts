import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import { JewelrySettingVariantRepository } from "./jewelrySettingVariant.repository";
import { JewelrySettingVariantService } from "./jewelrySettingVariant.service";
import { JewelrySettingVariantController } from "./jewelrySettingVariant.controller";

@Module({
    imports: [TypeOrmModule.forFeature([JewelrySettingVariantEntity])],
    controllers: [JewelrySettingVariantController],
    providers: [JewelrySettingVariantService, {
        useClass: JewelrySettingVariantRepository,
        provide: 'IJewelrySettingVariantRepository'
    }]
})
export class JewelrySettingVariantModule{

}