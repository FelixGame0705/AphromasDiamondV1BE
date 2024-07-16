import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity'; 

@EventSubscriber()
export class MaterialJewelrySubscriber implements EntitySubscriberInterface<MaterialJewelryEntity> {
  /**
   * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
   */
  listenTo() {
    return MaterialJewelryEntity;
  }

  /**
   * Được gọi sau khi cập nhật thực thể.
   */
  async afterInsert(event: InsertEvent<MaterialJewelryEntity>){
    this.handleAfterInsertOrUpdate(event);
  }

  async afterUpdate(event: UpdateEvent<MaterialJewelryEntity>) {
    this.handleAfterInsertOrUpdate(event);
  }

  async handleAfterInsertOrUpdate(event: InsertEvent<MaterialJewelryEntity> | UpdateEvent<MaterialJewelryEntity>) {
    // Kiểm tra nếu giá bán đã thay đổi
    //if (event.updatedColumns.some(column => column.propertyName === 'SellPrice')) {
      const materialPrice = event.entity;
      if (!materialPrice) return;
      const jewelryRepository = event.manager.getRepository(JewelrySettingVariantEntity);
      const materialRepository = event.manager.getRepository(MaterialJewelryEntity)
      // Cập nhật giá của tất cả trang sức dựa trên giá bán mới
      const jewelries = await jewelryRepository.find();
      let material = null;
      for (const jewelry of jewelries) {
        // Logic cập nhật giá trang sức
        if (jewelry.Weight) {
          material = await materialRepository.findOne({where: {MaterialJewelryID: jewelry.MaterialJewelryID}})
          jewelry.Price = calculateNewPrice(jewelry, material.SellPrice);
          await jewelryRepository.save(jewelry);
        }
      }
      console.log('Cập nhật hoàn tất.');
    }
  }
//}

// Hàm trợ giúp để tính giá trang sức mới
function calculateNewPrice(jewelry: JewelrySettingVariantEntity, materialPrice: number): number {
  // Logic tính giá mới của bạn
  return jewelry.Weight * materialPrice;
}
