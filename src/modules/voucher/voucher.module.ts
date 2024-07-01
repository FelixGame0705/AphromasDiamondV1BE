import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillDiscountEntity } from "src/entities/billDiscount.entity";
import { BillDiscountRepository } from "./voucher.repository";
import { BillDiscountService } from "./voucher.service";
import { BillDiscountController } from "./voucher.controller";

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