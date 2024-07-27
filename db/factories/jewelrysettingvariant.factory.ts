import { setSeederFactory } from "typeorm-extension";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import dataSource from "db/data-source";
import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
     
      
    const  jewelrysettingvariants = new JewelrySettingVariantEntity()

    const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
    const jewelrytype = await jewelryTypeRepository.find();
    const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
    const materials = await materialRepository.find();
    const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
    const jewelrySettings = await jewelrySettingRepository.find();
    

    const jewelrySettingIDs = jewelrySettings.map(setting => setting.JewelrySettingID);

    jewelrysettingvariants.JewelrySettingID = faker.helpers.arrayElement(jewelrySettingIDs);

    jewelrysettingvariants.MaterialJewelryID = faker.datatype.number({min: 1, max: 4});
    
    jewelrysettingvariants.Weight = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Quantity = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Price = faker.datatype.number({min: 1, max: 5}); 
<<<<<<< HEAD

 
  

    const noSizeTypes = [2, 3, 4];
    const limitedMaterialTypes = [7, 8];

    // Lấy JewelryTypeID từ JewelrySettingID
    const jewelrySetting = jewelrySettings.find(setting => setting.JewelrySettingID === jewelrysettingvariants.JewelrySettingID);
    const jewelryType = jewelrytype.find(type => type.JewelryTypeID === jewelrySetting?.JewelryTypeID);

    if (jewelryType) {
        // Xử lý chất liệu
        if (limitedMaterialTypes.includes(jewelryType.JewelryTypeID)) {
            // Chọn một trong 4 chất liệu đầu tiên
            const limitedMaterials = materials.filter(material => material.MaterialJewelryID <= 4);
            if (limitedMaterials.length > 0) {
                jewelrysettingvariants.MaterialJewelryID = faker.helpers.arrayElement(limitedMaterials).MaterialJewelryID;
            } else {
                jewelrysettingvariants.MaterialJewelryID = null;
            }
        } else {
            // Chọn chất liệu ngẫu nhiên từ tất cả chất liệu
            if (materials.length > 0) {
                jewelrysettingvariants.MaterialJewelryID = faker.helpers.arrayElement(materials).MaterialJewelryID;
            } else {
                jewelrysettingvariants.MaterialJewelryID = null;
            }
        }

        // Xử lý kích thước
        if (noSizeTypes.includes(jewelryType.JewelryTypeID)) {
            jewelrysettingvariants.SizeID = null;
        } else {
            jewelrysettingvariants.SizeID = faker.datatype.number({ min: 1, max: 6 });
        }
    }

    return jewelrysettingvariants;
});
=======
    return  jewelrysettingvariants;
  })
>>>>>>> develop
