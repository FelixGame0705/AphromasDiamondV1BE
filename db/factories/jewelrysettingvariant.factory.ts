import { setSeederFactory } from "typeorm-extension";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";

export const jewelrysettingvariantsFactory = setSeederFactory(JewelrySettingVariantEntity, async (faker) => {
     
      
    const  jewelrysettingvariants = new JewelrySettingVariantEntity()


    jewelrysettingvariants.JewelrySettingID = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.MaterialJewelryID = faker.datatype.number({min: 1, max: 4});
    jewelrysettingvariants.Weight = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Quantity = faker.datatype.number({min: 1, max: 5});
    jewelrysettingvariants.Price = faker.datatype.number({min: 1, max: 5}); 
    // if(jewelrysettingvariants.MaterialJewelryID=1){ //Kiểm tra điều kiện nếu MaterialJewelryID là 1, thì gán giá trị cho trường SizeID.  
    // jewelrysettingvariants.SizeID = faker.datatype.number({min: 1, max: 15});
    // }else{
      
    // }
    return  jewelrysettingvariants;
  })