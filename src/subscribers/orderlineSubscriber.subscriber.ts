import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';

@EventSubscriber()
export class OrderlineSubscriber implements EntitySubscriberInterface<OrderLineEntity> {
  /**
   * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
   */
  listenTo() {
    return OrderLineEntity;
  }


  /**
   * Được gọi sau khi cập nhật thực thể.
   */
  async afterUpdate(event: UpdateEvent<OrderLineEntity>) {
    // Kiểm tra nếu jewelrySettingVariant đã thay đổi
    //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
    const product = event.entity;
    console.log("Product: ", product)
    if (!product) return;
    const productRepository = event.manager.getRepository(ProductEntity)
    const productEntity = (await productRepository.findOne({ where: { ProductID: product.ProductID } }))
    

    if (productEntity.JewelrySettingVariantID != null) {

     // const productRepository = event.manager.getRepository(ProductEntity)
      const jewelrySettingVariantRepository = event.manager.getRepository(JewelrySettingVariantEntity);
      const diamondRepository = event.manager.getRepository(DiamondEntity);

      // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
      const jewelrySettingVariant = await jewelrySettingVariantRepository.findOne({ where: { JewelrySettingVariantID: product.JewelrySettingVariantID } });
      const diamonds = await diamondRepository.find({ where: { ProductID: product.ProductID } });
      // for (const item of jewelrySettingVariants) {
      // Logic cập nhật giá trang sức
      const diamondsInProduct = diamonds.map(diamond => diamond.Price*diamond.ChargeRate);
      const diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
      console.log("JJJJ: ", product.ProductID);
      let price = calculateNewPrice(jewelrySettingVariant.Price, diamondsPrice);
      productEntity.Price = price;
      await productRepository.save(productEntity);
      // await jewelrySettingVariantRepository.save(item);
      // }
      console.log('Cập nhật hoàn tất.');
    }
    else {
      const productRepository = event.manager.getRepository(ProductEntity)
      productEntity.Price = null;
      await productRepository.save(productEntity);

    }
  }
}
//}

// Hàm trợ giúp để tính giá trang sức mới
function calculateNewPrice(jewelrySettingVariant: number, totalDiamondPrice: number): number {
  // Logic tính giá mới của bạn
  return Number(jewelrySettingVariant) + Number(totalDiamondPrice);
}

function calculateOldPrice(jewelry: JewelrySettingVariantEntity, productionCost: number, auxiliaryCost: number): number {
  // Logic tính giá mới của bạn
  return jewelry.Price -= productionCost + auxiliaryCost;
}
