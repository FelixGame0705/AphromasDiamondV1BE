import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity'; 
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';

@EventSubscriber()
export class JewelrySettingSubscriber implements EntitySubscriberInterface<JewelrySettingEntity> {
  /**
   * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
   */
  private isHandlingUpdate = false;
  listenTo() {
    return JewelrySettingEntity;
  }


  // async beforeUpdate(event: UpdateEvent<JewelrySettingEntity>) {
  //   if (this.isHandlingUpdate) {
  //     return;
  // }

  // this.isHandlingUpdate = true;
  // try{
  //   // Kiểm tra nếu jewelrySettingVariant đã thay đổi
  //   //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
  //     const jewelrySetting = event.entity;
  //     if (!jewelrySetting) return;

  //     const jewelrySettingVariant = event.manager.getRepository(JewelrySettingVariantEntity);
  //     //const diamondRepository = event.manager.getRepository(DiamondEntity);

  //     // Cập nhật giá của tất cả trang sức dựa trên giá bán cũ
  //     const jewelrySettingVariants = await jewelrySettingVariant.find({where: {JewelrySettingID: jewelrySetting.JewelrySettingID}});
  //     //const diamonds = await diamondRepository.find();
      
  //     for (const product of jewelrySettingVariants) {
  //       // Logic cập nhật giá trang sức
  //       //const diamondsInProduct = diamonds.filter((p)=>p.ProductID === product.ProductID).map(diamond => diamond.Price);
  //         product.Price = calculateOldPrice(product, jewelrySetting.ProductionCost, jewelrySetting.AuxiliaryCost);
          
  //         await jewelrySettingVariant.save(product);
  //     }
  //     console.log('Cập nhật hoàn tất jewelrySetting');
  //   } finally{
  //     this.isHandlingUpdate = false;
  //   }
  //   }
 // }


  /**
   * Được gọi sau khi cập nhật thực thể.
   */
  async afterUpdate(event: UpdateEvent<JewelrySettingEntity>) {
    if (this.isHandlingUpdate) {
      return;
  }

  this.isHandlingUpdate = true;
  try{
    // Kiểm tra nếu jewelrySettingVariant đã thay đổi
    //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
      const jewelrySetting = event.entity;
      if (!jewelrySetting) return;

      const jewelrySettingVariant = event.manager.getRepository(JewelrySettingVariantEntity);
      //const diamondRepository = event.manager.getRepository(DiamondEntity);

      // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
      const jewelrySettingVariants = await jewelrySettingVariant.find({where: {JewelrySettingID: jewelrySetting.JewelrySettingID}});
      //const diamonds = await diamondRepository.find();
      
      // for (const item of jewelrySettingVariants) {
      //   // Logic cập nhật giá trang sức
      //   //const diamondsInProduct = diamonds.filter((p)=>p.ProductID === product.ProductID).map(diamond => diamond.Price);
      //     // item.Price = calculateNewPrice(item.Price, jewelrySetting.ProductionCost, jewelrySetting.AuxiliaryCost);
          
      //     await jewelrySettingVariant.save(item);
      // }
      await jewelrySettingVariant.save(jewelrySettingVariants)
      console.log('Cập nhật hoàn tất.');
    }finally{
      this.isHandlingUpdate = false;
    }
  }
  }
//}

// Hàm trợ giúp để tính giá trang sức mới
function calculateNewPrice(jewelry: number, productionCost: number, auxiliaryCost: number): number {
  // Logic tính giá mới của bạn
  return jewelry+=productionCost+auxiliaryCost;
}

function calculateOldPrice(jewelry: number, productionCost: number, auxiliaryCost: number): number {
    // Logic tính giá mới của bạn
    return jewelry-=productionCost+auxiliaryCost;
  }
