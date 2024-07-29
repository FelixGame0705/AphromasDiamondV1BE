import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountEntity } from "src/entities/discount.entity";
import { DiscountController } from "./discount.controller";
import { DiscountRepository } from "./discount.repository";
import { DiscountService } from "./discount.service";
import { DiamondEntity } from "src/entities/diamond.entity";
import { ProductEntity } from "src/entities/products.entity";
import { DiamondService } from "../diamond/diamond.service";
import { DiamondRepository } from "../diamond/diamond.repository";
import { ProductService } from "../product/product.service";
import { ProductRepository } from "../product/product.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DiscountEntity, DiamondEntity, ProductEntity])],
    controllers: [DiscountController],
    providers: [DiscountService, {
        useClass: DiscountRepository,
        provide: 'IDiscountRepository'
    },
    DiamondService,{
        useClass: DiamondRepository,
        provide: 'IDiamondRepository'
    },
    ProductService,{
        useClass: ProductRepository,
        provide: 'IProductRepository'
    }
]
})
export class DiscountModule{

}