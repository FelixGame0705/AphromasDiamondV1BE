import { DiamondEntity } from 'src/entities/diamond.entity';
import { setSeederFactory } from 'typeorm-extension';
// import { collectionFactory } from './collection.factory';

export const diamondFactory = setSeederFactory(DiamondEntity, async (faker) => {
  const diamond = new DiamondEntity()

  
  // Shape 
  const shapes = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 
                  'Heart', 'Cushion', 'Radiant', 'Pear', 'Asscher'];
  diamond.Shape = faker.helpers.arrayElement(shapes);

  // Color: random từ D đến Z
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  diamond.Color = faker.helpers.arrayElement(colors);

  //WeightCarat 
  // const WeightCarat = parseFloat(faker.datatype.number({ min: 0.30, max: 9.50, precision: 0.01 }).toFixed(2));
  const WeightCarat = parseFloat(faker.datatype.number({ min: 0.05, max: 30.00, precision: 0.01 }).toFixed(2));
  diamond.WeightCarat = WeightCarat;

  diamond.IsActive= true;

   

  //PercentDepth 
  diamond.PercentDepth = parseFloat(faker.datatype.number({ min: 59, max: 63, precision: 0.1 }).toFixed(1));

  //LengthOnWidthRatio
  diamond.LengthOnWidthRatio = parseFloat(faker.datatype.number({ min: 1.00, max: 1.99, precision: 0.01 }).toFixed(2));

  //IsActive
  // diamond.IsActive = faker.datatype.boolean();

  //Fluorescence
  const fluorescence = ['None', 'Faint', 'Medium', 'Strong', 'Very Strong'];
  diamond.Fluorescence = faker.helpers.arrayElement(fluorescence);

  //Clarity 
  const clarity = ['FL','IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
  diamond.Clarity = faker.helpers.arrayElement(clarity);

  //PercentTable
  diamond.PercentTable = parseFloat(faker.datatype.number({ min: 53, max: 58, precision: 0.1 }).toFixed(1));

  //Cut 
  // const cut = ['Good', 'Very Good', 'Excellent', 'Superior', 'Flawless', 'Very Flawless'];
  const cut = ['Good', 'Very Good', 'Ideal', 'Astor Ideal'];
  diamond.Cut = faker.helpers.arrayElement(cut);

  //polish
  const polish = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Polish = faker.helpers.arrayElement(polish);

  //Symmetry
  const symmetry = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Symmetry = faker.helpers.arrayElement(symmetry);

  //Charge rate
   diamond.ChargeRate = faker.datatype.number({ min: 20, max: 60, precision: 0.1 }); 

  //UpdateTime
  diamond.UpdateTime = faker.date.recent();

  //Stars
  diamond.Stars = faker.datatype.number({ min: 3, max: 5, precision: 0.1 });

  //Name
  diamond.Name = `${diamond.WeightCarat} Carat ${diamond.Color}-${diamond.Clarity} ${diamond.Cut} Cut ${diamond.Shape} Diamond`;
  //Description
  diamond.Description = `This exquisite ${diamond.WeightCarat} carat ${diamond.Shape.toLowerCase()} cut diamond is a true masterpiece of nature and craftsmanship. With its ${diamond.Color} color grade and ${diamond.Clarity} clarity, it exhibits a remarkable brilliance and fire. The ${diamond.Cut.toLowerCase()} cut maximizes its light performance, creating a dazzling display of sparkle.

  The diamond's ${diamond.PercentDepth}% depth percentage and ${diamond.PercentTable}% table percentage contribute to its optimal proportions, enhancing its overall beauty. Its ${diamond.LengthOnWidthRatio} length-to-width ratio gives it a balanced and appealing appearance.

  This gem features a ${diamond.Fluorescence.toLowerCase()} fluorescence, adding to its unique character. The ${diamond.Polish.toLowerCase()} polish and ${diamond.Symmetry.toLowerCase()} symmetry further attest to the superior quality of this diamond.

  Whether set in a stunning piece of jewelry or appreciated on its own, this diamond is sure to captivate with its timeless elegance and unparalleled beauty. It's not just a gemstone; it's a testament to the wonders of nature and the skill of master cutters.`;

  //foreign key
  // diamond.JewelrySettingVariantID =  faker.datatype.number({ min: 1, max: 5 });
  // diamond.ProductID =faker.datatype.number({ min: 1, max: 5 });
  // diamond.CollectionID =  faker.datatype.number({ min: 1, max: 5 });
  // diamond.DiscountID = faker.datatype.number({ min: 1, max: 5 });
  

  diamond.Designer = faker.person.fullName();
  diamond.Cutter = faker.person.fullName();
  // diamond.IndexVariantGroup = null;
  diamond.Quantity = 1;
  
  
  // Price 
  let basePrice: number;

  if (WeightCarat < 0.5) {
    // Dưới 0.5 Carat
    if (diamond.Color <= 'F' && ['FL', 'IF', 'VVS1', 'VVS2'].includes(diamond.Clarity)) {
      basePrice = parseFloat(faker.datatype.number({ min: 1500, max: 5000 }).toFixed(2));
    } else {
      basePrice = parseFloat(faker.datatype.number({ min: 500, max: 2000 }).toFixed(2));
    }
  } else if (WeightCarat >= 0.5 && WeightCarat < 1) {
    // Từ 0.5 đến 1 Carat
    if (diamond.Color <= 'F' && ['FL', 'IF', 'VVS1', 'VVS2'].includes(diamond.Clarity)) {
      basePrice = parseFloat(faker.datatype.number({ min: 5000, max: 15000 }).toFixed(2));
    } else {
      basePrice = parseFloat(faker.datatype.number({ min: 2000, max: 7000 }).toFixed(2));
    }
  } else if (WeightCarat >= 1 && WeightCarat < 2) {
    // Từ 1 đến 2 Carat
    if (diamond.Color <= 'F' && ['FL', 'IF', 'VVS1', 'VVS2'].includes(diamond.Clarity)) {
      basePrice = parseFloat(faker.datatype.number({ min: 15000, max: 40000 }).toFixed(2));
    } else {
      basePrice = parseFloat(faker.datatype.number({ min: 7000, max: 20000 }).toFixed(2));
    }
  } else {
    // Trên 2 Carat
    if (diamond.Color <= 'F' && ['FL', 'IF', 'VVS1', 'VVS2'].includes(diamond.Clarity)) {
      basePrice = parseFloat(faker.datatype.number({ min: 40000, max: 100000 }).toFixed(2));
    } else {
      basePrice = parseFloat(faker.datatype.number({ min: 20000, max: 60000 }).toFixed(2));
    }
  }

  // Ensure that basePrice does not exceed $200,000
  basePrice = Math.min(basePrice, 200000);
  diamond.Price = basePrice;
  //DiscountPrice  
  let discountPercent;

  if (basePrice < 2000) {
    discountPercent = faker.datatype.number({ min: 5, max: 7 });
  } else if (basePrice >= 2000 && basePrice < 5000) {
    discountPercent = faker.datatype.number({ min: 7, max: 15 });
  } else if (basePrice >= 5000 && basePrice < 12000) {
    discountPercent = faker.datatype.number({ min: 10, max: 20 });
  } else {
    discountPercent = faker.datatype.number({ min: 15, max: 25 });
  }

  diamond.DiscountPrice = parseFloat((basePrice * (1 - discountPercent / 100)).toFixed(2));

 //foreign key
  // diamond.JewelrySettingVariantID =  faker.datatype.number({ min: 1, max: 5 });
  // diamond.ProductID =faker.datatype.number({ min: 1, max: 5 });
  // diamond.CollectionID =  faker.datatype.number({ min: 1, max: 5 });
  // diamond.DiscountID = faker.datatype.number({ min: 1, max: 5 });
  

  // diamond.Designer = faker.person.fullName();
  // diamond.Cutter = faker.person.fullName();
  // diamond.IndexVariantGroup = null;
  return diamond;
})