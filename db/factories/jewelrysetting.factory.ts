import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { setSeederFactory } from "typeorm-extension";

export const jewelrysettingFactory = setSeederFactory(JewelrySettingEntity, async (faker) => {
     
      
    const  jewelrysetting = new JewelrySettingEntity()
    const shape = ['round', 'princess', 'emerald', 'marquise', 'oval', 'heart', 'cushion', 'radiant', 'pear'];
    jewelrysetting.Name = faker.commerce.productName();
    jewelrysetting.ProductionCost = faker.datatype.number({ min: 50, max: 200 });  
    jewelrysetting.AuxiliaryCost = faker.datatype.number({ min: 10, max: 100 });  
    jewelrysetting.IsActive = faker.datatype.boolean();
    jewelrysetting.UpdateTime = faker.date.recent();
    jewelrysetting.DiamondShape = faker.helpers.arrayElement(shape);
    jewelrysetting.ChargeRate = faker.number.int({ min: 10, max: 40 });
    jewelrysetting.JewelryTypeID = faker.datatype.number({ min: 1, max: 4 });



     
    return  jewelrysetting;
  })