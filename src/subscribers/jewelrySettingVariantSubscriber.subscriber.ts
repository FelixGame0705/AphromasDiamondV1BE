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

    private isHandlingUpdate = false;
    /**
     * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
     */
    listenTo() {
        return JewelrySettingVariantEntity;
    }

    /**
     * Được gọi sau khi cập nhật thực thể.
     */
    @Transactional()
    async afterInsert(event: InsertEvent<JewelrySettingVariantEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            //this.handleAfterInsertOrUpdate(event);
            const jewelryVariantPrice = event.entity;
            if (!jewelryVariantPrice) return;
            console.log(jewelryVariantPrice)
            const jewelryVariant = event.manager.getRepository(JewelrySettingVariantEntity);
            const jewelrySettingRepository = event.manager.getRepository(JewelrySettingEntity)
            const materialRepository = event.manager.getRepository(MaterialJewelryEntity);
            //let jewelry = await jewelryVariant.findOne({where: {JewelrySettingVariantID: jewelryVariantPrice.JewelrySettingVariantID}})
            const jewelry = await jewelrySettingRepository.findOne({ where: { JewelrySettingID: jewelryVariantPrice.JewelrySettingID } })
            const jewelryPrice = Number((await materialRepository.findOne({ where: { MaterialJewelryID: jewelryVariantPrice.MaterialJewelryID } })).SellPrice) * Number(jewelryVariantPrice.Weight) + Number(jewelry.AuxiliaryCost) + Number(jewelry.ProductionCost)
            jewelryVariantPrice.Price = jewelryPrice;
            jewelryVariant.save(jewelryVariantPrice)
           // jewelryVariant.update(jewelryVariantPrice.JewelrySettingVariantID, { Price: jewelryPrice })
            // const diamondRepository = event.manager.getRepository(DiamondEntity);
            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
            //const jewelrySettingVariant = await jewelrySettingVariantRepository.find();
            // const diamonds = await diamondRepository.find();
            //jewelryVariantPrice.Price = material.filter(material=>material.MaterialJewelryID)[0].SellPrice * jewelryVariantPrice.Weight;
        }
        finally {
            this.isHandlingUpdate = false;
        }
    }
    @Transactional()
    async afterUpdate(event: UpdateEvent<JewelrySettingVariantEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            console.log('Hello', event.entity)
            // this.handleAfterInsertOrUpdate(event);
            const jewelryVariantPrice = event.entity;
            if (!jewelryVariantPrice) return;
            const jewelryVariantRepository = event.manager.getRepository(JewelrySettingVariantEntity)
            const jewelryRepository = event.manager.getRepository(JewelrySettingEntity)
            const productRepository = event.manager.getRepository(ProductEntity);
            const diamondRepository = event.manager.getRepository(DiamondEntity);
            const materialRepository = event.manager.getRepository(MaterialJewelryEntity);
          //  console.log("error: "+ (await productRepository.find()))
            // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
            const jewelrySetting = await jewelryRepository.findOne({where: {JewelrySettingID: jewelryVariantPrice.JewelrySettingID}})
            const jewelryVariant = await jewelryVariantRepository.findOne({where: {JewelrySettingVariantID: jewelryVariantPrice.JewelrySettingVariantID}})
            const products = await productRepository.find({where: {JewelrySettingVariantID: jewelryVariantPrice.JewelrySettingVariantID}});
            console.log("Hello 123 " + products.map(item=>item.ProductID))
           // const diamonds = await diamondRepository.find({where: {JewelrySettingVariantID: jewelryVariantPrice.JewelrySettingVariantID}});
            //jewelryVariantPrice.Price = material.filter(material=>material.MaterialJewelryID)[0].SellPrice * jewelryVariantPrice.Weight;
            
            const jewelryPrice = Number(((await materialRepository.findOne({ where: { MaterialJewelryID: jewelryVariantPrice.MaterialJewelryID } })).SellPrice) * Number(jewelryVariantPrice.Weight) + Number(jewelrySetting.AuxiliaryCost) + Number(jewelrySetting.ProductionCost) * Number(jewelrySetting.ChargeRate))/100
            for(let i = 0; i < products.length; i++){
                // Logic cập nhật giá trang sức
                const diamonds = await diamondRepository.find({where: {ProductID: products[i].ProductID}});
                jewelryVariant.Price = jewelryPrice
                //const diamondsInProduct = diamonds.filter((p) => p.ProductID === products[i].ProductID).map(diamond => diamond.Price);
                products[i].Price = calculateNewPrice(products[i], jewelryVariant.Price, diamonds.map(item=>item.Price));
                console.log("Value price: ", products[i].Price)
                await productRepository.save(products[i]);  
            }
            
            await jewelryVariantRepository.save(jewelryVariant);
            
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


        }catch(error){
            console.log(error)
        }
        finally {
            this.isHandlingUpdate = false;
        }
    }
}

// Hàm trợ giúp để tính giá trang sức mới
function calculateNewPrice(jewelry: ProductEntity, jewelryVariantPrice: number, diamonds: number[]): number {
    let diamondPrie = 0;
    if(diamonds.length>0){
    diamondPrie = diamonds.reduce((acc, current) => acc + current, 0)
    }
    const calculatedPrice = jewelryVariantPrice + diamondPrie;
    return calculatedPrice; // Trả về 0 nếu calculatedPrice là null hoặc undefined
}
