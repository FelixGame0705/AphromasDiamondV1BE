import { ProductEntity } from "src/entities/products.entity";
import { setSeederFactory } from "typeorm-extension";

export const   productFactory = setSeederFactory(ProductEntity, async (faker) => {
       
    const product = new ProductEntity()
    product.Name = faker.commerce.productName();
    product.Quantity = 1;
    product.Inscription = null;
    product.InscriptionFont = null;
    const Brandnem =  ['FL','IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
    product.Brand = faker.company.name();
    product.JewelrySettingID = faker.datatype.number({ min: 1, max: 5 }); 
    product.Stars = faker.datatype.number({ min: 1, max: 5 });




    // Giá cơ bản cho trang sức có kim cương
  let basePrice;
  let discountPercent;

  // if (faker.datatype.number({ min: 1, max: 100 }) <= 30) { // Giả định 30% là giá trị có kim cương (cái này sẽ điều chỉnh sau)
    basePrice = faker.datatype.number({ min: 1000, max: 15000 });

    if (basePrice < 1000) {
      discountPercent = faker.datatype.number({ min: 10, max: 20 });
    } else if (basePrice >= 1000 && basePrice < 5000) {
      discountPercent = faker.datatype.number({ min: 15, max: 25 });
    } else if (basePrice >= 5000 && basePrice < 15000) {
      discountPercent = faker.datatype.number({ min: 20, max: 30 });
    } else {
      discountPercent = faker.datatype.number({ min: 25, max: 35 });
    }

    product.Price = basePrice;
    product.DiscountPrice = parseFloat((basePrice * (1 - discountPercent / 100)).toFixed(2));
  // } else {
    // Trang sức không có kim cương
    // product.Price = faker.datatype.number({ min: 200, max: 1000 });
    // product.DiscountPrice = product.Price;
  // }



    // product.AccountID = faker.datatype.number({ min: 5, max: 99999999 });
    // product.CollectionID = faker.datatype.number({ min: 1, max: 5 });
    // product.DiscountID = faker.datatype.number({ min: 1, max: 5 });
    // product.JewelrySettingVariantID = faker.datatype.number({ min: 1, max: 4 });
    
     
     
       
    return product;
  })