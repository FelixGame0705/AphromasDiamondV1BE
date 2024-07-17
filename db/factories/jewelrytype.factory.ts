import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { setSeederFactory } from "typeorm-extension";

// Mapping cố định giữa ID và loại trang sức
const jewelryTypeMapping = {
  1: 'Rings',
  2: 'Necklace',
  3: 'Bracelet',
  4: 'Earring'
};

export const jewelrytypeFactory = setSeederFactory(JewelryTypeEntity, async (faker) => {
  const jewelrytype = new JewelryTypeEntity()

  // Chọn một ID ngẫu nhiên từ 1 đến 4
  const jewelryTypeID = faker.datatype.number({ min: 1, max: 4 });

  // Gán ID cho jewelrytype  
  jewelrytype.JewelryTypeID = jewelryTypeID;

  // Lấy tên loại trang sức tương ứng với ID
  jewelrytype.Name = jewelryTypeMapping[jewelryTypeID];
     
  return jewelrytype;
})