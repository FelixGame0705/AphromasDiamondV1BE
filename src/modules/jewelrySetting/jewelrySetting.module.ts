import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { JewelrySettingController } from "./jewelrySetting.controller";

import { JewelrySettingService as JewelrySettingService } from "./jewelrySetting.service";
import { JewelrySettingRepository } from "./jewelrySetting.repository";

@Module({
    imports: [TypeOrmModule.forFeature([JewelrySettingEntity])],
    controllers: [JewelrySettingController],
    providers: [JewelrySettingService, {
        useClass: JewelrySettingRepository,
        provide: 'IJewelrySettingRepository'
    }]
})
export class JewelrySettingModule{

}