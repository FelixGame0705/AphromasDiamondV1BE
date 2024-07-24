import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';

@EventSubscriber()
export class DiamondSubscriber implements EntitySubscriberInterface<DiamondEntity> {
    /**
     * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
     */
    private isHandlingUpdate = false;

    listenTo() {
        return DiamondEntity;
    }


    async afterInsert(event: InsertEvent<DiamondEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            const diamond = event.entity;
            const diamondRepository = event.manager.getRepository(DiamondEntity)
            const diamondEntity = await diamondRepository.findOne({where: {DiamondID: diamond.DiamondID}})
            diamondEntity.DiscountPrice = diamondEntity.Price;
            await diamondRepository.save(diamondEntity)
            const productRepository = event.manager.getRepository(ProductEntity)
            const productEntity = await productRepository.findOne({where:{ProductID: diamondEntity.ProductID}})
            if(productEntity != null)
            await productRepository.save(productEntity)
            // Phát sự kiện thông báo cập nhật ProductEntity
            // this.eventBus.publish(new ProductUpdatedEvent(diamond.DiamondID, diamondEntity.DiscountPrice));
        }
        finally {
            this.isHandlingUpdate = false;
        }
    }
}