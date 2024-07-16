import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { MaterialJewelryRepository } from 'src/modules/materialjewelry/materialjewelry.repository';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { Transactional } from 'typeorm-transactional';

@EventSubscriber()
export class JewelrySettingVariantSubscriber implements EntitySubscriberInterface<JewelrySettingVariantEntity> {
    /**
     * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
     */
    listenTo() {
        return JewelrySettingVariantEntity;
    }

    /**
     * Được gọi sau khi cập nhật thực thể.
     */
    // @Transactional()
    // async afterInsert(event: InsertEvent<JewelrySettingVariantEntity>) {
    //     //this.handleAfterInsertOrUpdate(event);
    //     const jewelryVariantPrice = event.entity;
    //     if (!jewelryVariantPrice) return;
    //     console.log(jewelryVariantPrice)
    //     const jewelryVariant = event.manager.getRepository(JewelrySettingVariantEntity);
    //     const jewelrySettingRepository = event.manager.getRepository(JewelrySettingEntity)
    //     const materialRepository = event.manager.getRepository(MaterialJewelryEntity);
    //     //let jewelry = await jewelryVariant.findOne({where: {JewelrySettingVariantID: jewelryVariantPrice.JewelrySettingVariantID}})
    //     const jewelry = await jewelrySettingRepository.findOne({ where: { JewelrySettingID: jewelryVariantPrice.JewelrySettingID } })
    //     const jewelryPrice = Number((await materialRepository.findOne({ where: { MaterialJewelryID: jewelryVariantPrice.MaterialJewelryID } })).SellPrice) * Number(jewelryVariantPrice.Weight) + Number(jewelry.AuxiliaryCost) + Number(jewelry.ProductionCost)
    //     console.log(jewelryPrice)
    //     jewelryVariant.update(jewelryVariantPrice.JewelrySettingVariantID, { Price: jewelryPrice })
    //     // const diamondRepository = event.manager.getRepository(DiamondEntity);
    //     // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
    //     //const jewelrySettingVariant = await jewelrySettingVariantRepository.find();
    //     // const diamonds = await diamondRepository.find();
    //     //jewelryVariantPrice.Price = material.filter(material=>material.MaterialJewelryID)[0].SellPrice * jewelryVariantPrice.Weight;
    // }
    // @Transactional()
    async afterUpdate(event: UpdateEvent<JewelrySettingVariantEntity>) {
        console.log('Hello', event.entity)
        // this.handleAfterInsertOrUpdate(event);
        const jewelryVariantPrice = event.entity;
            if (!jewelryVariantPrice) return;
            console.log("Qua met moi"+event.entity)
            const productRepository = event.manager.getRepository(ProductEntity);
            const diamondRepository = event.manager.getRepository(DiamondEntity);
            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
            const products = await productRepository.find();
            const diamonds = await diamondRepository.find();
            //jewelryVariantPrice.Price = material.filter(material=>material.MaterialJewelryID)[0].SellPrice * jewelryVariantPrice.Weight;
            for (const product of products) {
                // Logic cập nhật giá trang sức
                const diamondsInProduct = diamonds.filter((p) => p.ProductID === product.ProductID).map(diamond => diamond.Price);
                product.Price = calculateNewPrice(product, jewelryVariantPrice.Price, diamondsInProduct);

                await productRepository.save(product);
            }

            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới

            //   for (const jewelry of jewelrySettingVariant) {
            //     // Logic cập nhật giá trang sức
            //     if (jewelry.Weight) {
            //       
            //       jewelry.Price = jewelry.Weight*material.SellPrice;
            //       await jewelryRepository.save(jewelry);
            //     }
            //   }
            console.log('Cập nhật hoàn tất.');
        

    }
    async handleAfterInsertOrUpdate(event: UpdateEvent<JewelrySettingVariantEntity>) {
        // Kiểm tra nếu jewelrySettingVariant đã thay đổi
        //if (event.updatedColumns.some(column => column.propertyName === 'MaterialJewelryID')) {
            const jewelryVariantPrice = event.entity;
            if (!jewelryVariantPrice) return;
            console.log("Qua met moi"+event.entity)
            const productRepository = event.manager.getRepository(ProductEntity);
            const diamondRepository = event.manager.getRepository(DiamondEntity);
            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
            const products = await productRepository.find();
            const diamonds = await diamondRepository.find();
            //jewelryVariantPrice.Price = material.filter(material=>material.MaterialJewelryID)[0].SellPrice * jewelryVariantPrice.Weight;
            for (const product of products) {
                // Logic cập nhật giá trang sức
                const diamondsInProduct = diamonds.filter((p) => p.ProductID === product.ProductID).map(diamond => diamond.Price);
                product.Price = calculateNewPrice(product, jewelryVariantPrice.Price, diamondsInProduct);

                await productRepository.save(product);
            }

            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới

            //   for (const jewelry of jewelrySettingVariant) {
            //     // Logic cập nhật giá trang sức
            //     if (jewelry.Weight) {
            //       
            //       jewelry.Price = jewelry.Weight*material.SellPrice;
            //       await jewelryRepository.save(jewelry);
            //     }
            //   }
            console.log('Cập nhật hoàn tất.');
        }
    }
//}

// Hàm trợ giúp để tính giá trang sức mới
function calculateNewPrice(jewelry: ProductEntity, jewelryVariantPrice: number, diamonds: number[]): number {
    // Logic tính giá mới của bạn
    return jewelryVariantPrice + diamonds.reduce((acc, current) => acc + current, 0);
}
