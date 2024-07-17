import { setSeederFactory } from "typeorm-extension";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";

export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
     
      
    const  jewelrysettingvariants = new JewelrySettingVariantEntity()

    jewelrysettingvariants.SizeID = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.JewelrySettingID = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.MaterialJewelryID = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Weight = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Quantity = faker.datatype.number({min: 1, max: 5});
    // jewelrysettingvariants.Price = faker.datatype.number({min: 1, max: 5});  
    return  jewelrysettingvariants;
  })