// import { setSeederFactory } from "typeorm-extension";
// import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
// import { DataSource } from "typeorm";

// const materialMapping = {
//   1: '14K Yellow Gold',
//   2: '14K Rose Gold',
//   3: '14K White Gold',
//   4: 'Platinum'
// };

// export const materialjewelryFactory = setSeederFactory(MaterialJewelryEntity, async (faker, dataSource: DataSource) => {
//   const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
//   const existingMaterials = await materialRepository.find();
//   const existingNames = existingMaterials.map(material => material.Name);

//   let newMaterialId = null;
//   let newMaterialName = null;

//   for (let id = 1; id <= Object.keys(materialMapping).length; id++) {
//     if (!existingNames.includes(materialMapping[id])) {
//       newMaterialId = id;
//       newMaterialName = materialMapping[id];
//       break;
//     }
//   }

//   if (newMaterialId === null) {
//     // Tất cả các vật liệu đã tồn tại, không cần tạo mới
//     return null;
//   }

//   const materialJewelry = new MaterialJewelryEntity();

//   materialJewelry.MaterialJewelryID = newMaterialId;
//   materialJewelry.Name = newMaterialName;
//   materialJewelry.BuyPrice = parseFloat(faker.commerce.price());
//   materialJewelry.SellPrice = parseFloat(faker.commerce.price());
//   materialJewelry.UpdateTime = faker.date.recent();

//   return materialJewelry;
// });



import { setSeederFactory } from "typeorm-extension";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
import { DataSource } from "typeorm";
// import faker from 'faker'; // Make sure to import faker if you're using it

const materialMapping = {
  1: '14K Yellow Gold',
  2: '14K Rose Gold',
  3: '14K White Gold',
  4: 'Platinum'
};

export const materialjewelryFactory = (dataSource: DataSource) => setSeederFactory(MaterialJewelryEntity, async (faker) => {
  const materialRepository = dataSource.getRepository(MaterialJewelryEntity);
  const existingMaterials = await materialRepository.find();
  const existingNames = existingMaterials.map(material => material.Name);

  let newMaterialId = null;
  let newMaterialName = null;

  for (let id = 1; id <= Object.keys(materialMapping).length; id++) {
    if (!existingNames.includes(materialMapping[id])) {
      newMaterialId = id;
      newMaterialName = materialMapping[id];
      break;
    }
  }

  if (newMaterialId === null) {
    // All materials already exist, no need to create a new one
    return null;
  }

  const materialJewelry = new MaterialJewelryEntity();
  materialJewelry.MaterialJewelryID = newMaterialId;
  materialJewelry.Name = newMaterialName;
  materialJewelry.BuyPrice = parseFloat(faker.commerce.price());
  materialJewelry.SellPrice = parseFloat(faker.commerce.price());
  materialJewelry.UpdateTime = faker.date.recent();

  return materialJewelry;
});
