
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
 
import { AccountsEntity } from 'src/entities/accounts.entity';
import { CustomerEntity } from 'src/entities/customer.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { materialjewelryFactory } from '../factories/materialjewelry.factory';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { jewelrytypeFactory } from '../factories/jewelrytype.factory';
import { JewelryTypeEntity } from 'src/entities/jewelryType.entity';
import { SizeEntity } from 'src/entities/size.entity';
import { CollectionEntity } from 'src/entities/collection.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    try {
      console.log('Starting data seeding...');
      
      const customerFactory = factoryManager.get(CustomerEntity);
      const accountFactory = factoryManager.get(AccountsEntity);
      const orderFactory = factoryManager.get(OrderEntity);
      const materialjewelryFactory = factoryManager.get(MaterialJewelryEntity);
      const jewelrytypeFactory = factoryManager.get(JewelryTypeEntity);
      const sizeFactory = factoryManager.get(SizeEntity);
      const collectionFactory = factoryManager.get(CollectionEntity);

      // Create materials
       await materialjewelryFactory.saveMany(4);

      //create types
      await jewelrytypeFactory.saveMany(4);

      //create size 
      await sizeFactory.saveMany(15);

      //create collection
      await collectionFactory.saveMany(5);

      //create discount

  
 
      // Create customers
      const customers = await customerFactory.saveMany(5);

      // Create accounts for each customer
      for (const customer of customers) {
        await accountFactory.save({
          CustomerID: customer.CustomerID,
          // Add other necessary account fields here
        });
      }

      // Create orders for each customer
      for (const customer of customers) {
        await orderFactory.save({
          CustomerID: customer.CustomerID,
          // Add other necessary order fields here
        });
      }

      console.log('Data seeded successfully!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}