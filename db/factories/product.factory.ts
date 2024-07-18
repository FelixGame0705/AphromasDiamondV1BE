import { ProductEntity } from "src/entities/products.entity";
import { setSeederFactory } from "typeorm-extension";

export const   productFactory = setSeederFactory(ProductEntity, async (faker) => {
       
    const product = new ProductEntity()
    product.Name = faker.commerce.productName();
    product.Quantity = 1;
    product.Inscription = faker.commerce.productDescription();
    product.InscriptionFont = faker.commerce.productDescription();
    product.Brand = faker.company.name();
    product.JewelrySettingID = faker.datatype.number({ min: 1, max: 5 });
    product.Price = faker.datatype.number({ min: 100, max: 9999 });
    product.DiscountPrice = faker.datatype.number({ min: 100, max: 9999 });
    product.Stars = faker.datatype.number({ min: 1, max: 5 });

    // product.AccountID = faker.datatype.number({ min: 5, max: 99999999 });
    // product.CollectionID = faker.datatype.number({ min: 1, max: 5 });
    // product.DiscountID = faker.datatype.number({ min: 1, max: 5 });
    // product.JewelrySettingVariantID = faker.datatype.number({ min: 1, max: 4 });
    
     
     
       
    return product;
  })