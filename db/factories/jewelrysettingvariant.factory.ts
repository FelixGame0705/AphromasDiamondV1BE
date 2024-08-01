// import { setSeederFactory } from "typeorm-extension";
// import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
// import dataSource from "db/data-source";
// import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
// import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
// import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

// export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
//     const jewelrysettingvariants = new JewelrySettingVariantEntity();

//     const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
//     const jewelrytype = await jewelryTypeRepository.find();
    
//     const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
//     const materials = await materialRepository.find();

//     const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
//     const jewelrySettings = await jewelrySettingRepository.find();
    
//     const jewelrySettingIDs = jewelrySettings.map(setting => setting.JewelrySettingID);
//     jewelrysettingvariants.JewelrySettingID = faker.helpers.arrayElement(jewelrySettingIDs);
    
//     const jewelrySetting = jewelrySettings.find(setting => setting.JewelrySettingID === jewelrysettingvariants.JewelrySettingID);
//     const jewelryTypeEntity = jewelrytype.find(type => type.JewelryTypeID === jewelrySetting?.JewelryTypeID);

//     if (jewelryTypeEntity) {
//         const limitedMaterialTypes = [7, 8]; // Men Engagement Ring and Men Wedding Ring
//         const allMaterials = materials; // All materials available

//         if (limitedMaterialTypes.includes(jewelryTypeEntity.JewelryTypeID)) {
//             // For JewelryTypeID 7 and 8, select one of the first 4 materials
//             const firstFourMaterials = allMaterials.slice(0, 4);
//             if (firstFourMaterials.length > 0) {
//                 jewelrysettingvariants.MaterialJewelryID = faker.helpers.arrayElement(firstFourMaterials).MaterialJewelryID;
//             } else {
//                 jewelrysettingvariants.MaterialJewelryID = null;
//             }
//         } else {
//             // For other JewelryTypeIDs, ensure all 4 materials are used
//             if (allMaterials.length >= 4) {
//                 // Ensure the materials are used up to 4 different materials
//                 const usedMaterialIDs = new Set<number>();
//                 while (usedMaterialIDs.size < 4) {
//                     usedMaterialIDs.add(faker.helpers.arrayElement(allMaterials).MaterialJewelryID);
//                 }
//                 jewelrysettingvariants.MaterialJewelryID = Array.from(usedMaterialIDs)[0]; // Pick the first material ID
//             } else {
//                 jewelrysettingvariants.MaterialJewelryID = null;
//             }
//         }
        
//         // Set other properties
//         jewelrysettingvariants.Weight = faker.datatype.number({ min: 1, max: 5 });
//         jewelrysettingvariants.Quantity = faker.datatype.number({ min: 1, max: 5 });
//     }

//     return jewelrysettingvariants;
// });


import { setSeederFactory } from "typeorm-extension";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import dataSource from "db/data-source";
import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";

export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
    const jewelrysettingvariant = new JewelrySettingVariantEntity();

    // const jewelryTypeRepository = dataSource.getRepository(JewelryTypeEntity);
    // const jewelrytype = await jewelryTypeRepository.find();
    
    // const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
    // const materials = await materialRepository.find();

    // const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
    // const jewelrySettings = await jewelrySettingRepository.find();

    

    // // Tạo một JewelrySettingID ngẫu nhiên từ danh sách
    // jewelrysettingvariant.JewelrySettingID = faker.helpers.arrayElement(jewelrySettings.map(setting => setting.JewelrySettingID));

    // // Tìm JewelryType tương ứng
    // const jewelrySetting = jewelrySettings.find(setting => setting.JewelrySettingID === jewelrysettingvariant.JewelrySettingID);
    // const jewelryTypeEntity = jewelrytype.find(type => type.JewelryTypeID === jewelrySetting?.JewelryTypeID);

    // if (jewelryTypeEntity) {
    //     const allMaterials = materials;

    //     if ([7, 8].includes(jewelryTypeEntity.JewelryTypeID)) {
    //         // Chọn một trong bốn chất liệu đầu tiên
    //         const firstFourMaterials = allMaterials.slice(0, 4);
    //         if (firstFourMaterials.length > 0) {
    //             jewelrysettingvariant.MaterialJewelryID = faker.helpers.arrayElement(firstFourMaterials).MaterialJewelryID;
    //         } else {
    //             jewelrysettingvariant.MaterialJewelryID = null;
    //         }
    //     } else {
    //         if (allMaterials.length >= 4) {
    //             const usedMaterialIDs = new Set<number>();
    //             while (usedMaterialIDs.size < 4) {
    //                 usedMaterialIDs.add(faker.helpers.arrayElement(allMaterials).MaterialJewelryID);
    //             }
    //             jewelrysettingvariant.MaterialJewelryID = Array.from(usedMaterialIDs)[0];
    //         } else {
    //             jewelrysettingvariant.MaterialJewelryID = null;
    //         }
    //     }

        // Thiết lập các thuộc tính khác
        // jewelrysettingvariant.Price = faker.datatype.number({ min: 1, max: 5 });
        jewelrysettingvariant.Weight = faker.datatype.number({ min: 1, max: 5 });
        jewelrysettingvariant.Quantity = faker.datatype.number({ min: 1, max: 5 });

    // }
        

    return jewelrysettingvariant;
});

