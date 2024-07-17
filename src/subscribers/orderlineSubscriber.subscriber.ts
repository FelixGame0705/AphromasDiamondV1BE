import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
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
  async afterInsert(event: InsertEvent<OrderLineEntity>){
      // Kiểm tra nếu jewelrySettingVariant đã thay đổi
    //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
    const orderline = event.entity;
    console.log("orderline: ", orderline)
    if (!orderline) return;
    const orderlineRepository = event.manager.getRepository(OrderLineEntity)
    const orderlineEntity = (await orderlineRepository.findOne({ where: [{DiamondID: orderline.DiamondID}] }))
    

    if (orderlineEntity.DiamondID != null || orderlineEntity.ProductID != null) {
        
     // const productRepository = event.manager.getRepository(ProductEntity)
      const productRepository = event.manager.getRepository(ProductEntity);
      const diamondRepository = event.manager.getRepository(DiamondEntity);

      // Cập nhật giá của tất cả orderline dựa trên giá bán mới
      
      
      // for (const item of jewelrySettingVariants) {
      // Logic cập nhật giá trang sức
      //const diamondsInProduct = diamond.map(diamond => diamond.Price*diamond.ChargeRate);
      //const diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
      if(orderlineEntity.ProductID != null){
        const product = await productRepository.findOne({ where: { ProductID: orderline.ProductID } });
        orderlineEntity.Price = Number(product.Price);
        orderlineEntity.DiscountPrice = Number(product.DiscountPrice);
        orderline.DiamondID = null
      }else if(orderlineEntity.DiamondID != null){
        const diamond = await diamondRepository.findOne({ where: { DiamondID: orderline.DiamondID } });
        orderlineEntity.Price = Number(diamond.Price);
        orderlineEntity.DiscountPrice = Number(diamond.DiscountPrice);
        orderline.ProductID = null
      }
      await orderlineRepository.save(orderlineEntity);
      // await jewelrySettingVariantRepository.save(item);
      // }
      console.log('Cập nhật hoàn tất.');
    }
    else {
      const orderlineRepository = event.manager.getRepository(OrderLineEntity)
      orderlineEntity.Price = null;
      await orderlineRepository.save(orderlineEntity);

    }
  }
//   async afterUpdate(event: UpdateEvent<OrderLineEntity>) {
//     // Kiểm tra nếu jewelrySettingVariant đã thay đổi
//     //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
//     const orderline = event.entity;
//     console.log("orderline: ", orderline)
//     if (!orderline) return;
//     const orderlineRepository = event.manager.getRepository(OrderLineEntity)
//     const orderlineEntity = (await orderlineRepository.findOne({ where: {DiamondID: orderline.DiamondID} }))
    

//     if (orderlineEntity.DiamondID != null || orderlineEntity.ProductID != null) {
        
//      // const productRepository = event.manager.getRepository(ProductEntity)
//       const productRepository = event.manager.getRepository(ProductEntity);
//       const diamondRepository = event.manager.getRepository(DiamondEntity);

//       // Cập nhật giá của tất cả orderline dựa trên giá bán mới
//       const product = await productRepository.findOne({ where: { ProductID: orderline.ProductID } });
//       const diamond = await diamondRepository.findOne({ where: { DiamondID: orderline.DiamondID } });
//       // for (const item of jewelrySettingVariants) {
//       // Logic cập nhật giá trang sức
//       //const diamondsInProduct = diamond.map(diamond => diamond.Price*diamond.ChargeRate);
//       //const diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
//       if(orderlineEntity.ProductID != null){
//         orderlineEntity.Price = product.Price;
//         orderlineEntity.DiscountPrice = product.DiscountPrice;
//         orderline.DiamondID = null
//       }else if(orderlineEntity.DiamondID != null){
//         orderlineEntity.Price = diamond.Price;
//         orderlineEntity.DiscountPrice = diamond.DiscountPrice;
//         orderline.ProductID = null
//       }
//       await orderlineRepository.save(orderlineEntity);
//       // await jewelrySettingVariantRepository.save(item);
//       // }
//       console.log('Cập nhật hoàn tất.');
//     }
//     else {
//       const orderlineRepository = event.manager.getRepository(OrderLineEntity)
//       orderlineEntity.Price = null;
//       await orderlineRepository.save(orderlineEntity);

//     }
//   }
}