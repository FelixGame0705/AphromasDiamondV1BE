import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderLineRepository } from "./orderLine.repository";
import { OrderLineController } from "./orderLine.controller";
import { OrderLineService } from "./orderLine.service";
import { OrderLineEntity } from "../../entities/orderLine.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderLineEntity])],
    controllers: [OrderLineController],
    providers: [OrderLineService, {
        useClass: OrderLineRepository,
        provide: 'IOrderLineRepository'
    }]
})
export class OrderLineModule{

}