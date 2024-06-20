import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillDiscountEntity } from "src/entities/billDiscount.entity";
import { BillDiscountRepository } from "./billdiscount.repository";
import { BillDiscountService } from "./billdiscount.service";
import { BillDiscountController } from "./billdiscount.controller";

@Module({
    imports: [TypeOrmModule.forFeature([BillDiscountEntity])],
    controllers: [BillDiscountController],
    providers: [BillDiscountService, {
        useClass: BillDiscountRepository,
        provide: 'IBillDiscountRepository'
    }]
})
export class BillDiscountModule{

}