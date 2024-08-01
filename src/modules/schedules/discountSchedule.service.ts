import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/entities/discount.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { Repository, Not, LessThanOrEqual, MoreThanOrEqual, In, IsNull } from 'typeorm';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';

@Injectable()
export class DiscountScheduleService {
    constructor(
        @InjectRepository(DiscountEntity)
        private readonly discountRepository: Repository<DiscountEntity>,
        @InjectRepository(DiamondEntity)
        private readonly diamondRepository: Repository<DiamondEntity>,
        @InjectRepository(OrderLineEntity)
        private readonly orderLineRepository: Repository<OrderLineEntity>,
    ) { }

    @Cron('* 0 * * * *', {
        name: 'schedule',
        //timeZone: 'Europe/Paris',
    })
    async triggerDiscount() {
        try {
            const discountEntities = await this.discountRepository.find();
            const diamondEntities = await this.diamondRepository.find({ where: { DiscountID: Not(null) } });
            const orderlineEntities = await this.orderLineRepository.find({ where: { ProductID: Not(null), OrderID: Not(null) } })
            for (const discount of discountEntities) {
                if (new Date(discount?.StartDate).getTime() <= Date.now() && new Date(discount?.EndDate).getTime() >= Date.now()) {
                    for (const orderlines of orderlineEntities) {
                        if (orderlines.product.DiscountID === discount.DiscountID) {
                            orderlines.DiscountPrice = (orderlines.Price) * (100 - discount.PercentDiscounts) / 100
                            await this.orderLineRepository.save(orderlines);
                        }
                    }
                    for (const diamond of diamondEntities) {
                        if (diamond.DiscountID === discount.DiscountID) {
                            diamond.DiscountPrice = (diamond.Price * (1 - discount.PercentDiscounts / 100));
                            await this.diamondRepository.save(diamond);
                        }
                    }
                } else if (new Date(discount?.EndDate).getTime() >= Date.now()) {
                    for (const orderlines of orderlineEntities) {
                        if (orderlines.product.DiscountID === discount.DiscountID) {
                            orderlines.DiscountPrice = orderlines.Price;
                            await this.orderLineRepository.save(orderlines);
                        }
                    }
                    for (const diamond of diamondEntities) {
                        if (diamond.DiscountID === discount.DiscountID) {
                            diamond.DiscountPrice = diamond.Price; // Assuming you want to remove the discount price
                            await this.diamondRepository.save(diamond);
                        }
                    }
                }
            }
        }catch(error){
            console.log(error)
        }
    }
}
