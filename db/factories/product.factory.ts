import { ProductEntity } from "src/entities/products.entity";
import { setSeederFactory } from "typeorm-extension";

export const   productFactory = setSeederFactory(ProductEntity, async (faker) => {
       
    const product = new ProductEntity()
    product.Name = faker.commerce.productName();
    product.Inscription = faker.commerce.productDescription();
    product.InscriptionFont = faker.commerce.productDescription();
    product.Brand = faker.company.name();
    product.AccountID = faker.datatype.number({ min: 1, max: 10 });
    product.CollectionID = faker.datatype.number({ min: 1, max: 10 });
    product.DiscountID = faker.datatype.number({ min: 1, max: 10 });
    // product.DiamondID = faker.datatype.number({ min: 1, max: 10 });
     
     
       
    return product;
  })