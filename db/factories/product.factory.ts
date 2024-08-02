import dataSource from "db/data-source";
import { DiscountEntity } from "src/entities/discount.entity";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { ProductEntity } from "src/entities/products.entity";
import { setSeederFactory } from "typeorm-extension";

export const productFactory = setSeederFactory(ProductEntity, async (faker) => {
  const product = new ProductEntity();
  product.Name = faker.commerce.productName();
  product.Quantity = 1;
  product.Description = faker.commerce.productDescription();
  
  // Danh sách thương hiệu theo loại trang sức
  const ringBrands = ['Zac Zac Posen', 'Bella Vaughan', 'Blue Nile Studio', 'The Gallery Collection'];
  const otherBrands = ['Van Cleef & Arpels', 'Harry Winston', 'Cartier', 'Tiffany & Co', 'Bvlgari'];

  // Lấy JewelrySettingID từ repository
  const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
  const jewelrySettings = await jewelrySettingRepository.find();

  // Chọn một JewelrySettingID ngẫu nhiên từ danh sách
  if (jewelrySettings.length > 0) {
    const randomJewelrySetting = faker.helpers.arrayElement(jewelrySettings);
    product.JewelrySettingID = randomJewelrySetting.JewelrySettingID;
    
    // Phân loại thương hiệu dựa trên TypeID
    if ([1, 5, 6, 7, 8].includes(randomJewelrySetting.JewelryTypeID)) {
      // Nếu TypeID là một trong các giá trị cho Ring
      product.Brand = faker.helpers.arrayElement(ringBrands);
    } else if ([2, 3, 4].includes(randomJewelrySetting.JewelryTypeID)) {
      // Nếu TypeID là một trong các giá trị cho các jewelry còn lại
      product.Brand = faker.helpers.arrayElement(otherBrands);
    } else {
      // Nếu TypeID không thuộc danh sách đã xác định
      product.Brand = faker.helpers.arrayElement(['Unknown Brand']);
    }
  }

  product.Stars = faker.datatype.number({ min: 3, max: 5 });

  return product;
});
