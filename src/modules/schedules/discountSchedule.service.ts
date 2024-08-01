import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/entities/discount.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { Repository, Not } from 'typeorm';
import { DiamondEntity } from 'src/entities/diamond.entity';

@Injectable()
export class DiscountScheduleService {
    constructor(
        @InjectRepository(DiscountEntity)
        private readonly discountRepository: Repository<DiscountEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(DiamondEntity)
        private readonly diamondRepository: Repository<DiamondEntity>,
    ) {}

    @Cron('0 0 * * * *', {
        name: 'schedule',
        //timeZone: 'Europe/Paris',
    })
    async triggerDiscount() {
        const discountEntities = await this.discountRepository.find();
        const productEntities = await this.productRepository.find();
        const diamondEntities = await this.diamondRepository.find();
        for (const discount of discountEntities) {
            if (new Date(discount.StartDate).getTime() <= Date.now() && new Date(discount.EndDate).getTime() >= Date.now()) {
                for (const product of productEntities) {
                    if (product.DiscountID === discount.DiscountID) {
                        // product.DiscountPrice = (product.Price * (1 - discount.PercentDiscounts / 100));
                        await this.productRepository.save(product);
                    }
                }
                for (const diamond of diamondEntities) {
                    if (diamond.DiscountID === discount.DiscountID) {
                        diamond.DiscountPrice = (diamond.Price * (1 - discount.PercentDiscounts / 100));
                        await this.diamondRepository.save(diamond);
                    }
                }
            } else if (new Date(discount.EndDate).getTime() >= Date.now()) {
                for (const product of productEntities) {
                    if (product.DiscountID === discount.DiscountID) {
                        // product.DiscountPrice = null; // Assuming you want to remove the discount price
                        await this.productRepository.save(product);
                    }
                }
                for (const diamond of diamondEntities) {
                    if (diamond.DiscountID === discount.DiscountID) {
                        diamond.DiscountPrice = null; // Assuming you want to remove the discount price
                        await this.diamondRepository.save(diamond);
                    }
                }
            }
        }
    }
}
