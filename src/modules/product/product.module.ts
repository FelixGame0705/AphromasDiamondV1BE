import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/products.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { JewelrySettingRepository } from "../jewelrySetting/jewelrySetting.repository";
import { JewelrySettingService } from "../jewelrySetting/jewelrySetting.service";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, JewelrySettingEntity])],
    controllers: [ProductController],
    providers: [ProductService, {
        useClass: ProductRepository,
        provide: 'IProductRepository'
    },JewelrySettingService, {
        useClass: JewelrySettingRepository,
        provide: 'IJewelrySettingRepository'}]
})
export class ProductModule{

}