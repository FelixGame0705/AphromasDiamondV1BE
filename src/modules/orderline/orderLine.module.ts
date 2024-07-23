import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderLineRepository } from "./orderLine.repository";
import { OrderLineController } from "./orderLine.controller";
import { OrderLineService } from "./orderLine.service";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { DiamondEntity } from "src/entities/diamond.entity";
import { ProductEntity } from "src/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderLineEntity, DiamondEntity, ProductEntity])],
    controllers: [OrderLineController],
    providers: [OrderLineService, {
        useClass: OrderLineRepository,
        provide: 'IOrderLineRepository'
    }]
})
export class OrderLineModule{

}