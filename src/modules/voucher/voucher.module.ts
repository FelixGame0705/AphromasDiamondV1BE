import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VoucherEntity } from "src/entities/voucher.entity";
import { VoucherRepository } from "./voucher.repository";
import { VoucherService } from "./voucher.service";
import { VoucherController } from "./voucher.controller";

@Module({
    imports: [TypeOrmModule.forFeature([VoucherEntity])],
    controllers: [VoucherController],
    providers: [VoucherService, {
        useClass: VoucherRepository,
        provide: 'IVoucherRepository'
    }]
})
export class BillDiscountModule{

}