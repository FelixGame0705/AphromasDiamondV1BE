import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { DiscountEntity } from 'src/entities/discount.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<ProductEntity> {
  private isHandlingUpdate = false;
  private oldProductQuantity = null;
  /**
   * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
   */
  listenTo() {
    return ProductEntity;
  }

  /**
   * Được gọi sau khi cập nhật thực thể.
   */
  async beforeUpdate(event: UpdateEvent<ProductEntity>) {
    if (this.isHandlingUpdate) {
      return;
  }

  this.isHandlingUpdate = true;
  try {
      // Kiểm tra nếu jewelrySettingVariant đã thay đổi
      //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
      const product = event.entity;
      console.log("product before update: ", product)
      const productRepository = event.manager.getRepository(ProductEntity)
      if (!product) return;
      const productEntity = (await productRepository.findOne({ where: [{ProductID:product.ProductID}] }))
      if (productEntity?.Quantity != null) {
          this.oldProductQuantity = productEntity.Quantity
      }
  }
  finally {
      this.isHandlingUpdate = false
  }
  }
  async afterUpdate(event: UpdateEvent<ProductEntity>) {
    // Kiểm tra nếu jewelrySettingVariant đã thay đổi
    //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
    if (this.isHandlingUpdate) {
      return;
    }

    this.isHandlingUpdate = true;
    try {
      const product = event.entity;
      console.log("Product: ", product)
      if (!product) return;
      const productRepository = event.manager.getRepository(ProductEntity)
      const productEntity = (await productRepository.findOne({ where: { ProductID: product.ProductID } }))

      if (productEntity.JewelrySettingVariantID != null) {

        // const productRepository = event.manager.getRepository(ProductEntity)
        const jewelrySettingVariantRepository = event.manager.getRepository(JewelrySettingVariantEntity);
        const diamondRepository = event.manager.getRepository(DiamondEntity);
        const discountRepository = event.manager.getRepository(DiscountEntity);
        const oldProductQuantity = this.oldProductQuantity;
        // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
        const jewelrySettingVariant = await jewelrySettingVariantRepository.findOne({ where: { JewelrySettingVariantID: product.JewelrySettingVariantID } });
        const diamonds = await diamondRepository.find({ where: { ProductID: product.ProductID } });
        const discountEntity = await discountRepository.findOne({ where: { DiscountID: product.DiscountID } })
        // for (const item of jewelrySettingVariants) {
        // Logic cập nhật giá trang sức
        let diamondsInProduct = null
        let diamondsPrice = null
        if (diamonds.length > 0) {
          diamondsInProduct = diamonds.map(diamond => diamond.Price * diamond.ChargeRate);
          diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
        }
        if (oldProductQuantity >= productEntity.Quantity) {
          for (const diamond of diamonds) {
            diamond.Quantity = 0
          }
          jewelrySettingVariant.Quantity -= 1;
        }
        if (oldProductQuantity <= productEntity.Quantity) {
          for (const diamond of diamonds) {
            diamond.Quantity = 1
            jewelrySettingVariant.Quantity += 1;
          }
        }
        console.log("JJJJ: ", product.ProductID);
        let price = calculateNewPrice(jewelrySettingVariant.Price, diamondsPrice);
        productEntity.Price = price;
        productEntity.DiscountPrice = price * Number(discountEntity.PercentDiscounts) / 100
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
    finally {
      this.isHandlingUpdate = false
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
