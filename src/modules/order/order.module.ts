import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { OrderEntity } from "src/entities/order.entity";
import { OrderController } from "./order.controller";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    controllers: [OrderController],
    providers: [OrderService, {
        useClass: OrderRepository,
        provide: 'IOrderRepository'
    }]
})
export class OrderModule{

}