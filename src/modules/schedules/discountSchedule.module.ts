import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { DiscountEntity } from 'src/entities/discount.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiscountScheduleService } from './discountSchedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountEntity, ProductEntity, DiamondEntity]),
  ],
  providers: [DiscountScheduleService],
})
export class DiscountScheduleModule {}