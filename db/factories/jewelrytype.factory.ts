import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { setSeederFactory } from "typeorm-extension";

export const jewelrytypeFactory = setSeederFactory(JewelryTypeEntity, async (faker) => {
    const Names = [
        'Rings',
        'Necklace',
        'Bracelet',
        'Earring'
      ];
      
    const jewelrytype = new JewelryTypeEntity()
    jewelrytype.Name = faker.helpers.arrayElement(Names);
     
       
    return jewelrytype;
  })