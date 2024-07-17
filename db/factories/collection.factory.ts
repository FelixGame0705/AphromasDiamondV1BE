import { CollectionEntity } from "src/entities/collection.entity";
import { setSeederFactory } from "typeorm-extension";

export const collectionFactory = setSeederFactory(CollectionEntity, async (faker) => {
     
      
    const collection = new CollectionEntity()
    //Collection name
    const name = ['Spring', 'Summer', 'Fall', 'Winter', 'Women-day', 'Valentine', 'Christmas'];
    collection.CollectionName =  `${faker.helpers.arrayElement(name)} ${faker.datatype.number({ min: 2020, max: 2024})} Collection`;
    
    collection.Description = faker.commerce.productDescription();
    collection.DebutTime = faker.date.past(1);
     
     
       
    return  collection;
  })