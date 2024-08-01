import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

import { setSeederFactory } from "typeorm-extension";

export const jewelrysettingFactory = setSeederFactory(JewelrySettingEntity, async (faker) => {
     
      
    const  jewelrysetting = new JewelrySettingEntity()
    // jewelrysetting.Name = faker.commerce.productName();

 
    // jewelrysetting.ProductionCost = faker.datatype.number({ min: 50, max: 200 });
    
    
    // const auxiliaryCostPercentage = faker.datatype.number({ min: 10, max: 20 }) / 100;
    // jewelrysetting.AuxiliaryCost = Math.round(jewelrysetting.ProductionCost * auxiliaryCostPercentage);
   
    


    jewelrysetting.IsActive = faker.datatype.boolean();
    jewelrysetting.UpdateTime = faker.date.recent();
    jewelrysetting.ChargeRate = faker.number.int({ min: 150, max: 300 });

    // //Thêm điều kiện nếu typeID = 7 và 8 thì null shape
    // jewelrysetting.JewelryTypeID = faker.datatype.number({ min: 1, max: 8 });
    // const shape = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 'Heart', 'Cushion', 'Radiant', 'Pear'];
    // if (jewelrysetting.JewelryTypeID === 7 || jewelrysetting.JewelryTypeID === 8) {
    //   jewelrysetting.DiamondShape = null; 
    // } else {
    //   jewelrysetting.DiamondShape =  faker.helpers.arrayElement(shape);
      
    // }
    
    // jewelrysetting.Name = faker.commerce.productName();
  //    // Lấy tên loại trang sức từ repository
  // const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
  // const jewelryType = await jewelryTypeRepository.findOneBy(jewelrysetting.JewelryTypeID);


     
    return  jewelrysetting;
  })