import { setSeederFactory } from "typeorm-extension";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";

export const materialjewelryFactory = setSeederFactory(MaterialJewelryEntity, async (faker) => {
    const materialNames = [
        '14K Yellow Gold',
        '14K Rose Gold',
        '14K White Gold',
        'Platinum'
      ];
      
    const materialjewelry = new MaterialJewelryEntity()
    materialjewelry.BuyPrice = parseFloat(faker.commerce.price());
    materialjewelry.SellPrice = parseFloat(faker.commerce.price());
    materialjewelry.UpdateTime = faker.date.recent();
    materialjewelry.Name = faker.helpers.arrayElement(materialNames);
       
    return materialjewelry;
  })