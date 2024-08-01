import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, LessThanOrEqual, MoreThanOrEqual, IsNull } from 'typeorm';
import { DiscountEntity } from 'src/entities/discount.entity';
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

    @Cron('0 * * * * *', {
        name: 'schedule',
        //timeZone: 'Europe/Paris',
    })
    async triggerDiscount() {
        try {
            const discountEntities = await this.discountRepository.find();
            const diamondEntities = await this.diamondRepository.find({ where: { DiscountID: Not(IsNull()) } });
            const orderlineEntities = await this.orderLineRepository.find({ where: { ProductID: Not(IsNull()), OrderID: Not(IsNull()) } });

            const now = new Date().getTime();

            for (const discount of discountEntities) {
                const startDate = new Date(discount?.StartDate).getTime();
                const endDate = new Date(discount?.EndDate).getTime();
                
                if (startDate <= now && endDate >= now) {
                    for (let orderlines of orderlineEntities) {
                        if (orderlines.product?.DiscountID === discount.DiscountID) {
                            orderlines.DiscountPrice = (orderlines.Price) * (100 - discount.PercentDiscounts) / 100;
                            await this.orderLineRepository.save(orderlines);
                        }
                    }
                    for (let diamond of diamondEntities) {
                        if (diamond.DiscountID === discount.DiscountID) {
                            
                            diamond.DiscountPrice = (diamond.Price * (1 - discount.PercentDiscounts / 100));
                            await this.diamondRepository.save(diamond);
                        }
                    }
                } else if (endDate < now) {
                    for (let orderlines of orderlineEntities) {
                        if (orderlines.product?.DiscountID === discount.DiscountID) {
                            orderlines.DiscountPrice = orderlines.Price;
                            await this.orderLineRepository.save(orderlines);
                        }
                    }
                    for (let diamond of diamondEntities) {
                        if (diamond.DiscountID === discount.DiscountID) {
                            diamond.DiscountPrice = diamond.Price;
                            await this.diamondRepository.save(diamond);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in triggerDiscount:', error);
        }
    }
}
