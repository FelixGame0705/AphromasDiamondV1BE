import { setSeederFactory } from "typeorm-extension";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";

// Mapping cố định giữa ID và loại vật liệu
const materialMapping = {
  1: '14K Yellow Gold',
  2: '14K Rose Gold',
  3: '14K White Gold',
  4: 'Platinum'
};

export const materialjewelryFactory = setSeederFactory(MaterialJewelryEntity, async (faker) => {
  const materialjewelry = new MaterialJewelryEntity()

  // Chọn một ID ngẫu nhiên từ 1 đến 4
  const materialID = faker.datatype.number({ min: 1, max: 4 });

  // Gán ID cho materialjewelry 
  materialjewelry.MaterialJewelryID = materialID;

  materialjewelry.BuyPrice = parseFloat(faker.commerce.price());
  materialjewelry.SellPrice = parseFloat(faker.commerce.price());
  materialjewelry.UpdateTime = faker.date.recent();
  
  // Lấy tên vật liệu tương ứng với ID
  materialjewelry.Name = materialMapping[materialID];
   
  return materialjewelry;
})