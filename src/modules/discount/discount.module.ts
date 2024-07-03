import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountEntity } from "src/entities/discount.entity";
import { DiscountController } from "./discount.controller";
import { DiscountRepository } from "./discount.repository";
import { DiscountService } from "./discount.service";

@Module({
    imports: [TypeOrmModule.forFeature([DiscountEntity])],
    controllers: [DiscountController],
    providers: [DiscountService, {
        useClass: DiscountRepository,
        provide: 'IDiscountRepository'
    }]
})
export class DiscountModule{

}