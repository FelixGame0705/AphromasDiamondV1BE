import dataSource from "db/data-source";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

import { setSeederFactory } from "typeorm-extension";

// Bản đồ hậu tố cho các loại trang sức khác nhau
const suffixMapById: { [key: number]: string[] } = {
  1: ['Elegance', 'Charm', 'Grace', 'Radiance', 'Union', 'Sophistication', 'Splendor'],  
  2: ['Charm', 'Allure', 'Elegance', 'Glamour'],                                       
  3: ['Grace', 'Elegance', 'Poise'],                                                    
  4: ['Radiance', 'Sparkle', 'Glow'],                                                  
  5: ['Union', 'Bond', 'Eternal'],                                                     
  6: ['Promise', 'Commitment', 'Vow'],                                                 
  7: ['Valor', 'Strength', 'Courage'],                                                  
  8: ['Bond', 'Union', 'Togetherness']                                                  
};

const usedNames = new Set<string>();

// Hàm để tạo tên duy nhất dựa trên loại và hậu tố
const generateUniqueName = (typeName: string, typeId: number, index: number): string => {
  const suffixes = suffixMapById[typeId] || ['Luxury'];
  const suffix = suffixes[index % suffixes.length];
  let name = `${typeName} ${suffix}`;

  // Đảm bảo tên là duy nhất
  let counter = 1;
  let uniqueName = name;
  while (usedNames.has(uniqueName)) {
    uniqueName = `${name} ${counter}`;
    counter++;
  }

  usedNames.add(uniqueName);
  return uniqueName;
};


export const jewelrysettingFactory = setSeederFactory(JewelrySettingEntity, async (faker) => {
  const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
  const jewelryTypeRepository = dataSource.getRepository("JewelryTypeEntity");
  const jewelryTypes = await jewelryTypeRepository.find();
      
    const  jewelrysetting = new JewelrySettingEntity()
  
    // jewelrysetting.ProductionCost = faker.datatype.number({ min: 50, max: 200 });
    // const auxiliaryCostPercentage = faker.datatype.number({ min: 10, max: 20 }) / 100;
    // jewelrysetting.AuxiliaryCost = Math.round(jewelrysetting.ProductionCost * auxiliaryCostPercentage);
   
    jewelrysetting.IsActive = faker.datatype.boolean();
    jewelrysetting.UpdateTime = faker.date.recent();
    jewelrysetting.ChargeRate = faker.number.int({ min: 150, max: 300 });

    jewelrysetting.JewelryTypeID = faker.datatype.number({ min: 1, max: 8 });
    const jewelryType = jewelryTypes.find(type => type.JewelryTypeID === jewelrysetting.JewelryTypeID);
    if (jewelryType) {
    jewelrysetting.Name = generateUniqueName(jewelryType.Name, jewelryType.JewelryTypeID, faker.datatype.number());
    } else {
    jewelrysetting.Name = `Tên mặc định ${faker.datatype.uuid()}`; // Tên dự phòng
    }

    //Thêm điều kiện nếu typeID = 7 và 8 thì null shape
   
    const shape = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 'Heart', 'Cushion', 'Radiant', 'Pear'];
    if (jewelrysetting.JewelryTypeID === 7 || jewelrysetting.JewelryTypeID === 8) {
      jewelrysetting.DiamondShape = null; 
    } else {
      jewelrysetting.DiamondShape =  faker.helpers.arrayElement(shape);
      
    }
    

     


    

     
    return  jewelrysetting;
  })


  