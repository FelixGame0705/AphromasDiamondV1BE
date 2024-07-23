import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { OrderEntity } from "src/entities/order.entity";
import { OrderController } from "./order.controller";
import { DiamondEntity } from "src/entities/diamond.entity";
import { DataSource } from "typeorm";
import { NotificationGateway } from "../notification/notificationGateway";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, DiamondEntity])],
    controllers: [OrderController],
    providers: [OrderService, NotificationGateway,{
        useClass: OrderRepository,
        provide: 'IOrderRepository'
    }]
})
export class OrderModule{

}