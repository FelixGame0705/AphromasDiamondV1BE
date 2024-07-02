import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountEntity } from "src/entities/discount.entity";
import { DiscountController } from "./discount.controller";
import { DiamondService } from "../diamond/diamond.service";
import { DiscountRepository } from "./discount.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DiscountEntity])],
    controllers: [DiscountController],
    providers: [DiamondService, {
        useClass: DiscountRepository,
        provide: 'IDiscountRepository'
    }]
})
export class DiscountModule{

}