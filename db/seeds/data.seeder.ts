
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, FindOneOptions } from 'typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { CustomerEntity } from 'src/entities/customer.entity';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
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
import { FeedbackEntity } from 'src/entities/feedback.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import * as bcrypt from 'bcrypt';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';
 
 

// import { CertificateRepository } from 'src/modules/certificate/certificate.repository';

export default class DataSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    try {
      console.log('Starting data seeding...');  


      const materials = insertMaterials(dataSource);
      const jewelrytypes = insertjewelryType(dataSource);
      const sizes = insertSizes(dataSource);
      const acc = insertAccounts(dataSource);

      await materials;
      await jewelrytypes;
      await sizes;
      await acc;
  
      //Create collection
      const collectionFactory = factoryManager.get(CollectionEntity);
      await collectionFactory.saveMany(9);

      //Create discount
      const discountFactory = factoryManager.get(DiscountEntity);
      await discountFactory.saveMany(10);
         
      //Create customers
      const customerFactory = factoryManager.get(CustomerEntity);
      const customers = await customerFactory.saveMany(6);

      //Create accounts for each customer
      const accountFactory = factoryManager.get(AccountsEntity);
      const accounts = [];
      for (const customer of customers) {
        const account = await accountFactory.save({
          CustomerID: customer.CustomerID,
        });
        accounts.push(account);
      }

      //Create notificate for each account
      //v1
      // const notificationFactory = factoryManager.get(NotificationEntity);
      // for (const account of accounts) {
      //   await notificationFactory.save({
      //     AccountID: account.AccountID,  
      //   }); 
      // }



      //v2
      const notificationFactory = factoryManager.get(NotificationEntity);

      // Hàm helper để tạo số ngẫu nhiên trong khoảng
      function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Tạo thông báo cho mỗi tài khoản
      for (const account of accounts) {
        // Số lượng thông báo cho mỗi tài khoản (ít nhất 1, tối đa 5)
        const notificationCount = getRandomInt(1, 5);
        for (let i = 0; i < notificationCount; i++) {
          await notificationFactory.save({
            AccountID: account.AccountID,
            // Các trường khác sẽ được tạo tự động bởi factory
          });
        }
      }
      


      //Create vouchers
      const voucherFactory = factoryManager.get(VoucherEntity);
      await voucherFactory.saveMany(20);



      //TạoOrder
      
      //Create orders for each customer

      //v1
      // const orderFactory = factoryManager.get(OrderEntity);
      // for (const customer of customers) {
      //   await orderFactory.save({
      //     CustomerID: customer.CustomerID,
      //   });
      // }
      
      //v2
      // const orderFactory = factoryManager.get(OrderEntity);
      // for (let i = 0; i < customers.length; i++) {
      //   const customer = customers[i];
      //   const voucher = vouchers[i % vouchers.length];  
      //   await orderFactory.save({
      //     CustomerID: customer.CustomerID,
      //     VoucherID: voucher.VoucherID,
      // });
      // }

      //v3
       // Create orders
        

      //Create jewelry setting  for each jewelry type
      const jewelryerysettingFactory = factoryManager.get(JewelrySettingEntity);
      // for (const type of jewelrytypes) {
      await jewelryerysettingFactory.saveMany(60); 
      // }
  
      //Create jewelry setting variant
      const jewellerysettingvariantFactory = factoryManager.get(JewelrySettingVariantEntity);
      await jewellerysettingvariantFactory.saveMany(120);

      // //Create products

      //v1
      // const productFactory = factoryManager.get(ProductEntity);
      // await productFactory.saveMany(5);
      
      
      //v3
      // Tạo sản phẩm (product)
      const productFactory = factoryManager.get(ProductEntity);

       

      const accountRepository = dataSource.getRepository(AccountsEntity);
      const collectionRepository = dataSource.getRepository(CollectionEntity);
      const discountRepository = dataSource.getRepository(DiscountEntity);
      const jewelrySettingVariantRepository = dataSource.getRepository(JewelrySettingVariantEntity);
      

       // Lấy dữ liệu từ cơ sở dữ liệu
       const customer = await accountRepository.find({ where: { Role: 'ROLE_CUSTOMER' } });
       const collections = await collectionRepository.find();
       const discounts = await discountRepository.find();
       const jewelrySettingVariants = await jewelrySettingVariantRepository.find();
 

      // Đặt số lượng sản phẩm bạn muốn tạo
      const productCount = 30;  

      // Tạo sản phẩm mới
      for (let i = 0; i < productCount; i++) {
        const customers = customer[i % customer.length];
        const collection = collections[i % collections.length];
        const discount = discounts[i % discounts.length];
        const jewelrySettingVariant = jewelrySettingVariants[i % jewelrySettingVariants.length];

        await productFactory.save({
          AccountID: customers.CustomerID,
          CollectionID: collection.CollectionID,
          DiscountID: discount.DiscountID,
          JewelrySettingVariantID: jewelrySettingVariant.JewelrySettingVariantID,
        });
      }
      
      //v2
      // // Tạo sản phẩm (product)
      // const productFactory = factoryManager.get(ProductEntity);

      // // Lấy danh sách tài khoản có vai trò là khách hàng (ROLE_CUSTOMER)
      // const customerAccounts = await accountFactory.saveMany(5, { Role: 'ROLE_CUSTOMER' });

      // // Lấy danh sách bộ sưu tập (collection), giảm giá (discount), và biến thể cài đặt trang sức (jewelry setting variant)
      // const collections = await collectionFactory.saveMany(5);
      // const discounts = await discountFactory.saveMany(5);
      // const jewelrySettingVariants = await jewellerysettingvariantFactory.saveMany(5);

      // // Tạo sản phẩm với các khóa ngoại
      // const productCount = 5; // Số lượng sản phẩm cần tạo
      // const usedAccountIds = new Set();

      // for (let i = 0; i < productCount; i++) {
      //   let accountId;
      //   do {
      //     accountId = customerAccounts[i % customerAccounts.length].AccountID;
      //   } while (usedAccountIds.has(accountId));

      //   usedAccountIds.add(accountId);
      //   const collectionId = collections[i % collections.length].CollectionID;
      //   const discountId = discounts[i % discounts.length].DiscountID;
      //   const jewelrySettingVariantId = jewelrySettingVariants[i % jewelrySettingVariants.length].JewelrySettingVariantID;

      //   // Tạo sản phẩm và lưu vào cơ sở dữ liệu
      //   await productFactory.save({
      //     AccountID: accountId,
      //     CollectionID: collectionId,
      //     DiscountID: discountId,
      //     JewelrySettingVariantID: jewelrySettingVariantId,
      //   });
      // }

      //Create diamonds
      const numDiamonds = 50; 
      const diamondFactory = factoryManager.get(DiamondEntity);
      let diamonds = []; 
      for(let i = 0; i<  numDiamonds; i++){
        const diamond = await diamondFactory.save(); 
        diamonds.push(diamond);
      }
      

      //Create certificates for each diamond
      const certificate = insertCertificates(dataSource);
      await certificate;
      
      

      // const certificateFactory = factoryManager.get(CertificateEntity);
      // for (const diamond of diamonds) {
      //   await certificateFactory.save({
      //     DiamondID: diamond.DiamondID, 
      //   });
      // }


      //Tạo  order line
      
      //Create order lines 
      // const orderLineFactory = factoryManager.get(OrderLineEntity);
      // await orderLineFactory.saveMany(5);
      
    
      // //Create feedback

      //v1
      // const feedbackFactory = factoryManager.get(FeedbackEntity);
      // await feedbackFactory.saveMany(5);

      //v2
      const feedbackFactory = factoryManager.get(FeedbackEntity);
      //lấy từ repository lên 
      const jewelrySettings = await dataSource.getRepository(JewelrySettingEntity).find();
      const accountss = await dataSource.getRepository(AccountsEntity).find();

      const numFeedback = 50;
      for (let i = 0; i < numFeedback; i++) {
        await feedbackFactory.save({
          DiamondID: diamonds[Math.floor(Math.random() * diamonds.length)].DiamondID,
          JewelrySettingID: jewelrySettings[Math.floor(Math.random() * jewelrySettings.length)].JewelrySettingID,
          OrderID: null,
          AccountID: accountss[Math.floor(Math.random() * accounts.length)].AccountID,
        });
      }
      

      console.log('Data seeded successfully!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}







async function insertMaterials(dataSource: DataSource) {
  const materialMapping = {
    1: '14K Yellow Gold',
    2: '14K Rose Gold',
    3: '14K White Gold',
    4: 'Platinum'
  };

  const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
  const existingMaterials = await materialRepository.find();

  for (let id = 1; id <= Object.keys(materialMapping).length; id++) {
    const materialName = materialMapping[id];
    
    // Check if material already exists
    const existingMaterial = existingMaterials.find(material => material.Name === materialName);
    
    if (!existingMaterial) {
      // Insert new material
      const newMaterial = new MaterialJewelryEntity();
      newMaterial.MaterialJewelryID = id;
      newMaterial.Name = materialName;
      newMaterial.BuyPrice = randomInt(50, 70);
      newMaterial.SellPrice = randomInt(70, 100);
      newMaterial.UpdateTime = new Date();
      
      await materialRepository.insert(newMaterial);
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function insertSizes(dataSource: DataSource) {
  const sizeMapping = {
    1: { size: 6, mm: 14.7 },
    2: { size: 7, mm: 15.6 },
    3: { size: 8, mm: 16.5 },
    4: { size: 9, mm: 17.3 },
    5: { size: 10, mm: 18.2 },
    6: { size: 11, mm: 19.0 },
    7: { size: 12, mm: 19.8 },
    8: { size: 13, mm: 20.6 },
    9: { size: 14, mm: 21.3 },
    10: { size: 15, mm: 22.2 },
    11: { size: 16, mm: 23.0 },
    12: { size: 17, mm: 23.8 },
    13: { size: 18, mm: 24.6 },
    14: { size: 19, mm: 25.4 },
    15: { size: 20, mm: 26.2 }
  };

  const sizeRepository = dataSource.getRepository(SizeEntity);
  const existingSizes = await sizeRepository.find();

  for (let id = 1; id <= Object.keys(sizeMapping).length; id++) {
    const sizeInfo = sizeMapping[id];
    
    // Check if size already exists
    const existingSize = existingSizes.find(size => size.SizeValue === sizeInfo.mm);
    
    if (!existingSize) {
      // Insert new size
      const newSize = new SizeEntity();
      newSize.SizeID = id;
      newSize.SizeValue = sizeInfo.mm;
      newSize.UnitOfMeasure = 'mm';
      
      await sizeRepository.insert(newSize);
    }
  }
}

async function insertjewelryType(dataSource: DataSource) {
  const jewelryTypeMapping = {
    1: 'Rings',
    2: 'Necklace',
    3: 'Bracelet',
    4: 'Earring'
  };

  const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
  const existingJewelryTypes = await jewelryTypeRepository.find();

  for (let id = 1; id <= Object.keys(jewelryTypeMapping).length; id++) {
    const jewelryTypeInfo = jewelryTypeMapping[id];
    
    // Check if size already exists
    const existingJewelryType = existingJewelryTypes.find(jeweklyType => jeweklyType.Name === jewelryTypeInfo.Name);
    
    if (!existingJewelryType) {
      // Insert new size
      const newType = new JewelryTypeEntity();
      newType.JewelryTypeID = id;
      newType.Name = jewelryTypeInfo;
      
      await jewelryTypeRepository.insert(newType);
    }
  }
}

 async function insertAccounts(dataSource: DataSource): Promise<void> {
  const accountsToInsert = [
    { Name: 'Admin', Password: 'Admin123', Role: 'ROLE_ADMIN' },
    { Name: 'Manager', Password: 'Manager123', Role: 'ROLE_MANAGER' },
    { Name: 'SaleStaff', Password: 'Sale123', Role: 'ROLE_SALE_STAFF' },
    { Name: 'DeliveryStaff', Password: 'Delivery123', Role: 'ROLE_DELIVERY_STAFF' },
  ];

  const accountRepository = dataSource.getRepository(AccountsEntity);

  for (const account of accountsToInsert) {
    // Hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(account.Password, salt);

    // Create new account entity
    const newAccount = new AccountsEntity();
    newAccount.Name = account.Name;
    newAccount.PhoneNumber = '1234567890';
    newAccount.Email = account.Name + '@gmail.com';
    newAccount.Password = hash; // Store hashed password
    newAccount.Role = account.Role;

    // Insert account into database
    await accountRepository.insert(newAccount);
  }
}

async function insertCertificates(dataSource: DataSource): Promise<void> {
  const CertificateRepository = dataSource.getRepository(CertificateEntity);
  const DiamondRepository = dataSource.getRepository(DiamondEntity);

  // Lấy tất cả Diamond đã tồn tại
  const existingDiamonds = await DiamondRepository.find();

  if (existingDiamonds.length === 0) {
    console.log("Không có Diamond nào tồn tại. Không thể tạo Certificate.");
    return;
  }

  // Tạo một chứng chỉ cho mỗi viên kim cương
  for (const diamond of existingDiamonds) {
    const newCertificate = new CertificateEntity();
    newCertificate.Name = 'GIA';  // Tất cả đều là GIA
    newCertificate.DiamondID = diamond.DiamondID;

    await CertificateRepository.save(newCertificate);
  }

  console.log(`Đã tạo ${existingDiamonds.length} chứng chỉ GIA cho ${existingDiamonds.length} viên kim cương.`);
}

