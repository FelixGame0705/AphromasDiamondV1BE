import { CollectionEntity } from "src/entities/collection.entity";
import { setSeederFactory } from "typeorm-extension";

export const collectionFactory = setSeederFactory(CollectionEntity, async (faker) => {
     
      
    const collection = new CollectionEntity()
    collection.CollectionName = faker.commerce.productName();
    collection.Description = faker.commerce.productDescription();
    collection.DebutTime = faker.date.past(1);
     
     
       
    return  collection;
  })