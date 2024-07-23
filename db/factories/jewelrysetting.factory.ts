import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { setSeederFactory } from "typeorm-extension";

export const jewelrysettingFactory = setSeederFactory(JewelrySettingEntity, async (faker) => {
     
      
    const  jewelrysetting = new JewelrySettingEntity()
    const shape = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 'Heart', 'Cushion', 'Radiant', 'Pear'];
    jewelrysetting.Name = faker.commerce.productName();
    jewelrysetting.ProductionCost = faker.datatype.number({ min: 50, max: 200 });
    
    
    const auxiliaryCostPercentage = faker.datatype.number({ min: 10, max: 20 }) / 100;
    jewelrysetting.AuxiliaryCost = Math.round(jewelrysetting.ProductionCost * auxiliaryCostPercentage);
    
    jewelrysetting.IsActive = faker.datatype.boolean();
    jewelrysetting.UpdateTime = faker.date.recent();
    jewelrysetting.DiamondShape = faker.helpers.arrayElement(shape);
    jewelrysetting.ChargeRate = faker.number.int({ min: 15, max: 25 });

    // jewelrysetting.JewelryTypeID = faker.datatype.number({ min: 1, max: 4 });



     
    return  jewelrysetting;
  })