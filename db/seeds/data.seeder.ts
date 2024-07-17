
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
import { DiscountEntity } from 'src/entities/discount.entity';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { NotificationEntity } from 'src/entities/notification.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { CertificateEntity } from 'src/entities/certificate.entity';
import { VoucherEntity } from 'src/entities/voucher.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';

export default class DataSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    try {
      console.log('Starting data seeding...');  
      //Create materials
      const materialjewelryFactory = factoryManager.get(MaterialJewelryEntity);
      await materialjewelryFactory.saveMany(4);

      //create jewelry types
      const jewelrytypeFactory = factoryManager.get(JewelryTypeEntity);
      await jewelrytypeFactory.saveMany(4);

      //Create size 
      const sizeFactory = factoryManager.get(SizeEntity);
      await sizeFactory.saveMany(15);

      //Create jewelry setting
      const jewelryerysettingFactory = factoryManager.get(JewelrySettingEntity);
      await jewelryerysettingFactory.saveMany(5);

      //Create jewelry setting variant
      const jewellerysettingvariantFactory = factoryManager.get(JewelrySettingVariantEntity);
      await jewellerysettingvariantFactory.saveMany(15);
       

      //Create collection
      const collectionFactory = factoryManager.get(CollectionEntity);
      await collectionFactory.saveMany(5);

      //Create discount
      const discountFactory = factoryManager.get(DiscountEntity);
      await discountFactory.saveMany(5);
      
      //Create customers
      const customerFactory = factoryManager.get(CustomerEntity);
      const customers = await customerFactory.saveMany(5);

      //Create accounts for each customer
      const accountFactory = factoryManager.get(AccountsEntity);
      for (const customer of customers) {
        await accountFactory.save({
          CustomerID: customer.CustomerID,
        });
      }
      //Create notificate
      const notificationFactory = factoryManager.get(NotificationEntity);
      await notificationFactory.saveMany(5);

      //Create products
      const productFactory = factoryManager.get(ProductEntity);
      await productFactory.saveMany(5);

      //Create diamonds
      const diamondFactory = factoryManager.get(MaterialJewelryEntity);
      await diamondFactory.saveMany(5);

      //Create certificates
      const certificateFactory = factoryManager.get(CertificateEntity);
      await certificateFactory.saveMany(5);

      //Create vouchers
      const voucherFactory = factoryManager.get(VoucherEntity);
      await voucherFactory.saveMany(5);

      //Create orders for each customer
      const orderFactory = factoryManager.get(OrderEntity);
      for (const customer of customers) {
          await orderFactory.save({
            CustomerID: customer.CustomerID,
          });
      }

      //Create order lines for each order
      const orderLineFactory = factoryManager.get(OrderLineEntity);
      

      //Create feedback




       
      

      

 

      

 




       

  


      console.log('Data seeded successfully!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}