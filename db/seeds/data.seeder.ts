
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, EntityManager, FindOneOptions } from 'typeorm';
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
import { faker } from '@faker-js/faker';



// import { OrderEntity } from 'src/entities/order.entity';
// import { OrderLineEntity } from 'src/entities/orderLine.entity';
// import { CertificateRepository } from 'src/modules/certificate/certificate.repository';
// import { collectionFactory } from '../factories/collection.factory';
// import { Size } from '../../src/models/size.model';
// import { jewelrytypeFactory } from '../factories/jewelrytype.factory';
// import { JewelryTypeRepository } from '../../src/modules/jewelryType/jewelryType.repository';
 

export default class DataSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    
  ): Promise<void> {
    try {
      console.log('Starting data seeding...');  

      //Create materials
        const materials = insertMaterials(dataSource);
        await materials;

      //Create types
        const jewelrytypes = insertjewelryType(dataSource);
        await jewelrytypes;

      //create sizes
        const sizes = insertSizes(dataSource); 
        await sizes;

      //Create accounts
        const acc = insertAccounts(dataSource);
        await acc;

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

      //Create collection cho Như Nguyên yêu cầu
        {
        // const collect = insertCollectionbyNN(dataSource);
        // await collect;

        // // //Create collection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        // const collectionFactory = factoryManager.get(CollectionEntity);
        // await collectionFactory.saveMany(2);
        }

      //Create discount
        const discountFactory = factoryManager.get(DiscountEntity);
        await discountFactory.saveMany(15);
         
      //Create notificate for each account
        //v1
        {
        // const notificationFactory = factoryManager.get(NotificationEntity);
        // for (const account of accounts) {
        //   await notificationFactory.save({
        //     AccountID: account.AccountID,  
        //   }); 
        // }
        }
        //v2
        const notificationFactory = factoryManager.get(NotificationEntity);
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
            });
          }
        }

      //Create vouchers
        const voucherFactory = factoryManager.get(VoucherEntity);
        await voucherFactory.saveMany(25);

      //TạoOrder
        {
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
        }
      
      //Create jewelry setting  
        {
        // // //v1
        // const jewelryerysettingFactory = factoryManager.get(JewelrySettingEntity);   
        // // const jewelrySettings =  
        // await jewelryerysettingFactory.saveMany(100); 
        // // Lấy tên loại trang sức từ repository
        // const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
        // const jewelrytype = await jewelryTypeRepository.find();

        //  const suffixMap: { [key: string]: string } = {
        //   'Rings': 'Elegance',
        //   'Necklace': 'Charm',
        //   'Bracelet': 'Grace',
        //   'Earring': 'Radiance',
        //   'Wedding Ring': 'Union',
        //   'Engagement Ring': 'Promise',
        //   'Men Engagement Ring': 'Valor',
        //   'Men Wedding Ring': 'Bond'


          
        // };

        // for (const jewelrysetting of  jewelrysetting) {
        //   const jewelryType = jewelrytype.find(type => type.JewelryTypeID === jewelrysetting.JewelryTypeID);
        //   if (jewelryType) {
        //     const typeName = jewelryType.Name;
        //     const suffix = suffixMap[typeName] || 'Luxury';
        //     jewelrysetting.Name = `${typeName} ${suffix}`;
        //     await dataSource.getRepository(JewelrySettingEntity).save(jewelrysetting);
        //   }
        // }


        //  //v2
        //   // Tạo các JewelrySettingEntity
        //   const jewelrySettingFactory = factoryManager.get(JewelrySettingEntity);
        //   const jewelrySettings = await jewelrySettingFactory.saveMany(100);

        //   // Lấy tên loại trang sức từ repository
        //   const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
        //   const jewelryTypes = await jewelryTypeRepository.find();

        //   const suffixMap: { [key: string]: string[] } = {
        //     'Rings': ['Elegance', 'Charm', 'Grace', 'Radiance', 'Union'],
        //     'Necklace': ['Charm'],
        //     'Bracelet': ['Grace'],
        //     'Earring': ['Radiance'],
        //     'Wedding Ring': ['Union'],
        //     'Engagement Ring': ['Promise'],
        //     'Men Engagement Ring': ['Valor'],
        //     'Men Wedding Ring': ['Bond']
        //   };

        //   const usedNames = new Set<string>();

        //   // Sinh tên duy nhất cho từng JewelrySettingEntity
        //   for (let i = 0; i < 100; i++) {
        //     const jewelrySetting = jewelrySettings[i];
        //     const jewelryType = jewelryTypes[i % jewelryTypes.length];

        //     if (jewelryType) {
        //       const typeName = jewelryType.Name;
        //       const suffixes = suffixMap[typeName] || ['Luxury'];
        //       const suffix = suffixes[i % suffixes.length];
        //       let name = `${typeName} ${suffix}`;

        //       // Đảm bảo tên là duy nhất
        //       let counter = 1;
        //       let uniqueName = name;
        //       while (usedNames.has(uniqueName)) {
        //         uniqueName = `${name} ${counter}`;
        //         counter++;
        //       }

        //       usedNames.add(uniqueName);
        //       jewelrySetting.Name = uniqueName;
        //     }
        //   }

        //   // Lưu các JewelrySettingEntity với tên duy nhất
        //   await dataSource.getRepository(JewelrySettingEntity).save(jewelrySettings);



        // //V3
        // // Tạo JewelrySettingEntity
        // const createJewelrySettings = async (numSettings: number, numActive: number) => {
        // const jewelrySettingFactory = factoryManager.get(JewelrySettingEntity);
        // const jewelrySettings = await jewelrySettingFactory.saveMany(numSettings);

        // // Lấy tên loại trang sức từ repository
        // const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
        // const jewelryTypes = await jewelryTypeRepository.find();

        // const suffixMapById: { [key: string]: string[] } = {
        //   'Rings': ['Elegance', 'Charm', 'Grace', 'Radiance', 'Union', 'Sophistication', 'Splendor'], // 1: Rings
        //   'Necklace': ['Charm', 'Allure', 'Elegance', 'Glamour'],                                     // 2: Necklace
        //   'Bracelet': ['Grace', 'Elegance', 'Poise'],                                                 // 3: Bracelet
        //   'Earring': ['Radiance', 'Sparkle', 'Glow'],                                                 // 4: Earring
        //   'Wedding Ring': ['Union', 'Bond', 'Eternal'],                                               // 5: Wedding Ring
        //   'Engagement Ring': ['Promise', 'Commitment', 'Vow'],                                        // 6: Engagement Ring
        //   'Men Engagement Ring': ['Valor', 'Strength', 'Courage'],                                    // 7: Men Engagement Ring
        //   'Men Wedding Ring': ['Bond', 'Union', 'Togetherness']  
            
          
        // };

        //   const usedNames = new Set<string>();

        //   // Sinh tên duy nhất cho từng JewelrySettingEntity
        //   for (let i = 0; i < numSettings; i++) {
        //     const jewelrySetting = jewelrySettings[i];
        //     const jewelryType = jewelryTypes[i % jewelryTypes.length];

        //     if (jewelryType) {
        //       const typeId = jewelryType.JewelryTypeID;   
        //       const typeName = jewelryType.Name;
        //       const suffixes = suffixMapById[typeId] || ['Luxury'];
        //       const suffix = suffixes[i % suffixes.length];
        //       let name = `${typeName} ${suffix}`;

        //       // Đảm bảo tên là duy nhất
        //       let counter = 1;
        //       let uniqueName = name;
        //       while (usedNames.has(uniqueName)) {
        //         uniqueName = `${name} ${counter}`;
        //         counter++;
        //       }

        //       usedNames.add(uniqueName);
        //       jewelrySetting.Name = uniqueName;

        //       // Gán giá trị isActive
        //       jewelrySetting.IsActive = i < numActive;
        //     }
        //   }

        //   // Lưu các JewelrySettingEntity với tên duy nhất
        //   await dataSource.getRepository(JewelrySettingEntity).save(jewelrySettings);
        // };

        // // Sử dụng hàm với số lượng và số lượng isActive mong muốn
        // await createJewelrySettings(100, 50);
        }
        await createJewelrySettings(dataSource, factoryManager, 6);




     
  
      //Create jewelry setting variant
      
        // const jewelryerysettingvariantFactory = factoryManager.get(JewelrySettingVariantEntity);  

        // // Nhập số lượng bạn muốn tạo
        // const numberOfVariants = 192;

        // // Sử dụng createMany để tạo nhiều bản sao
        // const variants = await jewelryerysettingvariantFactory.saveMany(numberOfVariants);

        // // Lưu tất cả các đối tượng vào cơ sở dữ liệu
        // await dataSource.getRepository(JewelrySettingVariantEntity).save(variants);


        const jewelrySettingVariantRepository = dataSource.getRepository(JewelrySettingVariantEntity);
    const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
    const materialRepository = dataSource.getRepository(MaterialJewelryEntity);

    // Lấy factory cho JewelrySettingVariantEntity
    const jewelrySettingVariantFactory = factoryManager.get(JewelrySettingVariantEntity);

    // Lấy danh sách tất cả JewelrySettings và Materials
    const jewelrySettings = await jewelrySettingRepository.find();
    const materialss = await materialRepository.find();

    for (const jewelrySetting of jewelrySettings) {
      // Lấy các variants đã tồn tại cho JewelrySettingID hiện tại
      const existingVariants = await jewelrySettingVariantRepository.find({
        where: { JewelrySettingID: jewelrySetting.JewelrySettingID },
        select: ['MaterialJewelryID']
      });

      const existingMaterialIds = new Set(existingVariants.map(v => v.MaterialJewelryID));

      // Nếu đã có đủ 4 variants, bỏ qua
      if (existingMaterialIds.size >= 4) {
        continue;
      }

      // Lấy các chất liệu còn thiếu để đủ 4 loại
      const availableMaterials = materialss.filter(m => !existingMaterialIds.has(m.MaterialJewelryID));
      const neededMaterials = availableMaterials.slice(0, 4 - existingMaterialIds.size);

      // Tạo các variants mới cho JewelrySettingID hiện tại
      const variantsToCreate = await Promise.all(neededMaterials.map(async material => {
        const variant = await jewelrySettingVariantFactory.make();
        variant.JewelrySettingID = jewelrySetting.JewelrySettingID;
        variant.MaterialJewelryID = material.MaterialJewelryID;
        return variant;
      }));

      // Lưu tất cả các đối tượng vào cơ sở dữ liệu
      await jewelrySettingVariantRepository.save(variantsToCreate);
    }
      
                  

         



      //Create products
        const productFactory = factoryManager.get(ProductEntity);
        //lấy từ repo lên 
        const accountRepository = dataSource.getRepository(AccountsEntity);
        // const collectionRepository = dataSource.getRepository(CollectionEntity);
        const discountRepository = dataSource.getRepository(DiscountEntity);
        // const jewelrySettingVariantRepository = dataSource.getRepository(JewelrySettingVariantEntity);
      
        const customer = await accountRepository.find({ where: { Role: 'ROLE_CUSTOMER' } });
        // const collections = await collectionRepository.find();
        const discounts = await discountRepository.find();
        //  const jewelrySettingVariants = await jewelrySettingVariantRepository.find();
        // Đặt số lượng sản phẩm bạn muốn tạo
        const productCount = 30;  
        // Tạo sản phẩm mới
        for (let i = 0; i < productCount; i++) {
          const customers = customer[i % customer.length];
          // const collection = collections[i % collections.length];
          const discount = discounts[i % discounts.length];
          // const jewelrySettingVariant = jewelrySettingVariants[i % jewelrySettingVariants.length];
          await productFactory.save({
            AccountID: customers.CustomerID,
            // CollectionID: collection.CollectionID,
            DiscountID: discount.DiscountID,
            // JewelrySettingVariantID: jewelrySettingVariant.JewelrySettingVariantID,
          });
        }
      
       
      //Create diamonds
        const numDiamonds = 30; 
        const diamondFactory = factoryManager.get(DiamondEntity);
        let diamonds = []; 
        for(let i = 0; i<  numDiamonds; i++){
          const diamond = await diamondFactory.save(); 
          diamonds.push(diamond);
        }
      
      //Create certificates for each diamond
        const certificate = insertCertificates(dataSource);
        await certificate;
      
      //Tạo order line
        {
        // //Create order lines 
        // // const orderLineFactory = factoryManager.get(OrderLineEntity);
        // // await orderLineFactory.saveMany(5);
        }
    
      //Create feedback

        //v1
        // const feedbackFactory = factoryManager.get(FeedbackEntity);
        // await feedbackFactory.saveMany(5);

        //v2
        const feedbackFactory = factoryManager.get(FeedbackEntity);
        //lấy từ repository lên 
        const jewelrySettingss = await dataSource.getRepository(JewelrySettingEntity).find();
        const accountss = await dataSource.getRepository(AccountsEntity).find();

        const numFeedback = 50;
        for (let i = 0; i < numFeedback; i++) {
          await feedbackFactory.save({
            DiamondID: diamonds[Math.floor(Math.random() * diamonds.length)].DiamondID,
            JewelrySettingID: jewelrySettingss[Math.floor(Math.random() * jewelrySettingss.length)].JewelrySettingID,
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


async function createJewelrySettings(
  dataSource: DataSource,
  factoryManager: SeederFactoryManager,
  maxSettingsPerType: number
): Promise<void> {
  const jewelrySettingFactory = factoryManager.get(JewelrySettingEntity);
  const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
  const jewelryTypes = await jewelryTypeRepository.find();

  const suffixMapById: { [key: string]: string[] } = {
    '1': ['Elegance', 'Charm', 'Grace', 'Radiance', 'Union', 'Sophistication', 'Splendor'], // Rings
    '2': ['Charm', 'Allure', 'Elegance', 'Glamour'],                                     // Necklace
    '3': ['Grace', 'Elegance', 'Poise'],                                                 // Bracelet
    '4': ['Radiance', 'Sparkle', 'Glow'],                                                 // Earring
    '5': ['Union', 'Bond', 'Eternal'],                                                   // Wedding Ring
    '6': ['Promise', 'Commitment', 'Vow'],                                                // Engagement Ring
    '7': ['Valor', 'Strength', 'Courage'],                                                 // Men Engagement Ring
    '8': ['Bond', 'Union', 'Togetherness']                                                // Men Wedding Ring
  };

  for (const jewelryType of jewelryTypes) {
    const settings = await jewelrySettingFactory.saveMany(maxSettingsPerType);
    const usedNames = new Set<string>();

    for (let i = 0; i < maxSettingsPerType; i++) {
      const jewelrySetting = settings[i];
      const typeName = jewelryType.Name;
      const suffixes = suffixMapById[jewelryType.JewelryTypeID] || ['Luxury'];
      const suffix = suffixes[i % suffixes.length];
      let name = `${typeName} ${suffix}`;

      // Đảm bảo tên là duy nhất
      let counter = 1;
      let uniqueName = name;
      while (usedNames.has(uniqueName)) {
        uniqueName = `${name} ${counter}`;
        counter++;
      }

      usedNames.add(uniqueName);
      jewelrySetting.Name = uniqueName;
      jewelrySetting.JewelryTypeID = jewelryType.JewelryTypeID;
      jewelrySetting.IsActive = true;

      // Thiết lập DiamondShape dựa trên JewelryTypeID
      if (jewelrySetting.JewelryTypeID === 7 || jewelrySetting.JewelryTypeID === 8) {
        jewelrySetting.DiamondShape = null;
      } else {
        const shape = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 'Heart', 'Cushion', 'Radiant', 'Pear'];
        jewelrySetting.DiamondShape = faker.helpers.arrayElement(shape);
      }
      
    }

    // Lưu các JewelrySettingEntity với tên duy nhất
    await dataSource.getRepository(JewelrySettingEntity).save(settings);
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
    // 1: { size: 6, mm: 14.7 },
    // 2: { size: 7, mm: 15.6 },
    1: { size: 8, mm: '15.3 mm'},
    // 4: { size: 9, mm: 17.3 },
    2: { size: 10, mm: '15.9 mm'},
    // 6: { size: 11, mm: 19.0 },
    3: { size: 12, mm: '16.5 mm' },
    // 8: { size: 13, mm: 20.6 },
    4: { size: 14, mm: '17.1 mm' },
    // 10: { size: 15, mm: 22.2 },
    5: { size: 16, mm: '17.8 mm' },
    // 12: { size: 17, mm: 23.8 },
    6: { size: 18, mm: '18.4 mm' },
    // 14: { size: 19, mm: 25.4 },
    // 15: { size: 20, mm: 26.2 }
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
      newSize.SizeValue = sizeInfo.size;
      newSize.UnitOfMeasure = sizeInfo.mm;
      
      await sizeRepository.insert(newSize);
    }
  }
}

async function insertjewelryType(dataSource: DataSource) {
  const jewelryTypeMapping = {
    1: 'Rings',
    2: 'Necklace',
    3: 'Bracelet',
    4: 'Earring',
    5: 'Wedding Ring',
    6: 'Engagement Ring',
    7: 'Men Engagement Ring',
    8: 'Men Wedding Ring',
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

async function insertCollectionbyNN(dataSource: DataSource): Promise<void> {

  const collecttionsInsert = [

    { id:1,Name: 'EDEN REFORESTATION PROJECT - ZAZA COLLECTION', 
      Description: 
      'The launch of the Zaza collection in 2020 was a nod to the people-nature relationship. We have done its bit in restoring forests and reducing extreme poverty by employing local villagers from around the world to plant thousands of trees every year. For every jewel purchased from the Zaza Collection, a tree was planted in collaboration with the Eden Reforestation Project\.* In addition, this project helped generate 494 days of employment for members of impoverished communities.' ,
       DebutTime: '2024-03-27 09:18:34'
    },
    {  id:2, Name: 'INTERNATIONAL\'S WOMEN\'S DAY 2021', 
      Description: 'In 2021, on the occasion of International Women\'s Day, we designed 1,000 limited edition jewels to collaborate with the NGO WPlan\. We want to show our commitment to authentic equality for girls and young women. The project seeks to ensure that each girl has decision-making power over the problems that affects her and the ability to access leadership positions to build a world free of discrimination, harassment and violence.', 
       DebutTime: '2024-03-08 09:18:34'
    },
    { id:3,Name: 'VALENTINE\'S DAY!', 
      Description: 'On the occasion of Valentine\'s Day, we designed 1,000 limited edition jewels\. Our mission is to not only celebrate love but also to empower women around the world. This special project seeks to support initiatives that promote self-love, confidence, and independence for women and girls\. By choosing our Valentine \'s Day collection, you are not just giving a gift of love, but also supporting a movement towards equality and empowerment for all women.',
      DebutTime: '2024-02-14 09:18:34'
    },
  ]
  const collectionRepository = dataSource.getRepository(CollectionEntity);

      for (const collection of collecttionsInsert) {
        const newCollection = new CollectionEntity();
        newCollection.CollectionID = collection.id;
        newCollection.CollectionName = collection.Name;
        newCollection.Description = collection.Description;
        newCollection.DebutTime = new Date(collection.DebutTime); // Converting string to Date
        await collectionRepository.insert(newCollection);
         
      }
    
  }

 async function insertAccounts(dataSource: DataSource): Promise<void> {
  const accountsToInsert = [
    { Name: 'Admin', Password: 'Admin1234', Role: 'ROLE_ADMIN' },
    { Name: 'Manager', Password: 'Manager1234', Role: 'ROLE_MANAGER' },
    { Name: 'SaleStaff', Password: 'Sale1234', Role: 'ROLE_SALE_STAFF' },
    { Name: 'DeliveryStaff', Password: 'Delivery1234', Role: 'ROLE_DELIVERY_STAFF' },
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


