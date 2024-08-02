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

{
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
}

import { setSeederFactory } from "typeorm-extension";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import dataSource from "db/data-source";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
 

export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
   


   // Lấy các repository cần thiết
   const jewelrySettingRepository = dataSource.getRepository(JewelrySettingEntity);
   const materialRepository = dataSource.getRepository(MaterialJewelryEntity);

   // Lấy danh sách JewelrySettings và Materials
   const jewelrySettings = await jewelrySettingRepository.find();
   const materials = await materialRepository.find();

   // Chọn một JewelrySetting ngẫu nhiên
   const jewelrySetting = faker.helpers.arrayElement(jewelrySettings);

   // Lấy các Material đã tồn tại cho JewelrySettingID hiện tại
   const existingVariants = await dataSource.getRepository(JewelrySettingVariantEntity).find({
       where: { JewelrySettingID: jewelrySetting.JewelrySettingID },
       select: ['MaterialJewelryID']
   });

   const existingMaterialIds = new Set(existingVariants.map(v => v.MaterialJewelryID));
   
   // Lấy các chất liệu còn thiếu để đủ 4 loại
   const availableMaterials = materials
       .filter(m => !existingMaterialIds.has(m.MaterialJewelryID))
       .slice(0, 4 - existingMaterialIds.size);

   // Nếu chưa đủ 4 chất liệu, chọn thêm từ danh sách material
   const selectedMaterials = [
       ...Array.from(existingMaterialIds).map(id => materials.find(m => m.MaterialJewelryID === id)!),
       ...availableMaterials
   ];

   // Chọn một chất liệu ngẫu nhiên từ danh sách đã chọn
   const material = faker.helpers.arrayElement(selectedMaterials);

   // Tạo JewelrySettingVariantEntity
   const jewelrysettingvariant = new JewelrySettingVariantEntity();
   jewelrysettingvariant.JewelrySettingID = jewelrySetting.JewelrySettingID;
   jewelrysettingvariant.MaterialJewelryID = material.MaterialJewelryID;
   jewelrysettingvariant.Weight = faker.datatype.number({ min: 1, max: 5 });
   jewelrysettingvariant.Quantity = faker.datatype.number({ min: 1, max: 5 });

   return jewelrysettingvariant;
     
});

