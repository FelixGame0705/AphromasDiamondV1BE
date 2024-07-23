import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { FeedbackEntity } from 'src/entities/feedback.entity';
import { Transactional } from 'typeorm-transactional';

@EventSubscriber()
export class FeedbackSubscriber implements EntitySubscriberInterface<FeedbackEntity> {
    private isHandlingUpdate = false;

    async afterInsert(event: InsertEvent<FeedbackEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try{
            const feedBack = event.entity;
            console.log('Feedback: ', feedBack)
            const diamondRepository = event.manager.getRepository(DiamondEntity)
            const productRepository = event.manager.getRepository(ProductEntity)
            const feedBackRepository = event.manager.getRepository(FeedbackEntity)
            const productEntity = await productRepository.findOne({where: {ProductID: feedBack.ProductID}})
            const diamondEntity = await diamondRepository.findOne({where: {DiamondID: feedBack.DiamondID}})
            if(feedBack.ProductID!=null){
                const feedBackEntities = await feedBackRepository.find({where: {ProductID: productEntity.ProductID}})
                productEntity.Stars =  (feedBackEntities.map(item=>item.Stars).reduce((acc, current) => acc + current, 0))/feedBackEntities.length
                await productRepository.save(productEntity)
            }else if(feedBack.DiamondID!=null){
                const feedBackEntities = await feedBackRepository.find({where: {DiamondID: diamondEntity.DiamondID}})
                diamondEntity.Stars =  (feedBackEntities.map(item=>item.Stars).reduce((acc, current) => acc + current, 0))/feedBackEntities.length
                await diamondRepository.save(diamondEntity)
            }
        }
        finally{
            this.isHandlingUpdate = false;
        }
    }

    async afterUpdate(event: UpdateEvent<FeedbackEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try{
            const feedBack = event.entity;
            if(!feedBack) return;
            const diamondRepository = event.manager.getRepository(DiamondEntity)
            const productRepository = event.manager.getRepository(ProductEntity)
            const feedBackRepository = event.manager.getRepository(FeedbackEntity)
            const productEntity = await productRepository.findOne({where: {ProductID: feedBack.ProductID}})
            const diamondEntity = await diamondRepository.findOne({where: {DiamondID: feedBack.DiamondID}})
            if(feedBack.ProductID!=null){
                const feedBackEntities = await feedBackRepository.find({where: {ProductID: productEntity.ProductID}})
                productEntity.Stars =  (feedBackEntities.map(item=>item.Stars).reduce((acc, current) => acc + current, 0))/feedBackEntities.length
                await productRepository.save(productEntity)
            }
            if(feedBack.DiamondID!=null){
                const feedBackEntities = await feedBackRepository.find({where: {DiamondID: diamondEntity.DiamondID}})
                diamondEntity.Stars =  (feedBackEntities.map(item=>item.Stars).reduce((acc, current) => acc + current, 0))/feedBackEntities.length
                await diamondRepository.save(diamondEntity)
            }
        }finally{
            this.isHandlingUpdate = false;
        }
    }
}