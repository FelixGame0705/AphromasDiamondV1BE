import { DiamondEntity } from 'src/entities/diamond.entity';
import { setSeederFactory } from 'typeorm-extension';
import { collectionFactory } from './collection.factory';

export const diamondFactory = setSeederFactory(DiamondEntity, async (faker) => {
  const diamond = new DiamondEntity()

  
  // Shape 
  const shapes = ['Round', 'Princess', 'Emerald', 'Marquise', 'Oval', 'Heart', 'Cushion', 'Radiant', 'Pear'];
  diamond.Shape = faker.helpers.arrayElement(shapes);

  // Price 
  diamond.Price = parseFloat(faker.commerce.price(1000, 100000, 2));
  diamond.DiscountPrice = diamond.Price

  // Color: random từ D đến Z
  diamond.Color = String.fromCharCode(faker.datatype.number({ min: 68, max: 90 })); // ASCII cho D-Z

  //WeightCarat 
  diamond.WeightCarat = parseFloat(faker.datatype.number({ min: 0.30, max: 9.50, precision: 0.01 }).toFixed(2));

  //PercentDepth 
  diamond.PercentDepth = parseFloat(faker.datatype.number({ min: 59, max: 63, precision: 0.1 }).toFixed(1));

  //LengthOnWidthRatio
  diamond.LengthOnWidthRatio = parseFloat(faker.datatype.number({ min: 1.00, max: 1.99, precision: 0.01 }).toFixed(2));

  //IsActive
  diamond.IsActive = faker.datatype.boolean();

  //Fluorescence
  const fluorescence = ['None', 'Faint', 'Medium', 'Strong', 'Very Strong'];
  diamond.Fluorescence = faker.helpers.arrayElement(fluorescence);

  //Clarity 
  const clarity = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  diamond.Clarity = faker.helpers.arrayElement(clarity);

  //PercentTable
  diamond.PercentTable = parseFloat(faker.datatype.number({ min: 53, max: 58, precision: 0.1 }).toFixed(1));

  //Cut 
  const cut = ['Good', 'Very Good', 'Excellent', 'Superior', 'Flawless', 'Very Flawless'];
  diamond.Cut = faker.helpers.arrayElement(cut);

  //polish
  const polish = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Polish = faker.helpers.arrayElement(polish);

  //Symmetry
  const symmetry = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Symmetry = faker.helpers.arrayElement(symmetry);

  //Charge rate
   diamond.ChargeRate = faker.datatype.number({ min: 0, max: 60, precision: 0.1 }); 

  //UpdateTime
  diamond.UpdateTime = faker.date.recent();

  //Name
  diamond.Name = `${diamond.WeightCarat} Carat ${diamond.Color}-${diamond.Clarity} ${diamond.Cut} Cut ${diamond.Shape} Diamond`;
  //Description
  diamond.Description = `This exquisite ${diamond.WeightCarat} carat ${diamond.Shape.toLowerCase()} cut diamond is a true masterpiece of nature and craftsmanship. With its ${diamond.Color} color grade and ${diamond.Clarity} clarity, it exhibits a remarkable brilliance and fire. The ${diamond.Cut.toLowerCase()} cut maximizes its light performance, creating a dazzling display of sparkle.

  The diamond's ${diamond.PercentDepth}% depth percentage and ${diamond.PercentTable}% table percentage contribute to its optimal proportions, enhancing its overall beauty. Its ${diamond.LengthOnWidthRatio} length-to-width ratio gives it a balanced and appealing appearance.

  This gem features a ${diamond.Fluorescence.toLowerCase()} fluorescence, adding to its unique character. The ${diamond.Polish.toLowerCase()} polish and ${diamond.Symmetry.toLowerCase()} symmetry further attest to the superior quality of this diamond.

  Whether set in a stunning piece of jewelry or appreciated on its own, this diamond is sure to captivate with its timeless elegance and unparalleled beauty. It's not just a gemstone; it's a testament to the wonders of nature and the skill of master cutters.`;

  //foreign key
  diamond.JewelrySettingVariantID =  faker.datatype.number({ min: 1, max: 5 });
  diamond.ProductID =faker.datatype.number({ min: 1, max: 5 });
  diamond.CollectionID =  faker.datatype.number({ min: 1, max: 5 });
  diamond.DiscountID = faker.datatype.number({ min: 1, max: 5 });
  

  diamond.Designer = faker.person.fullName();
  diamond.Cutter = faker.person.fullName();
  diamond.IndexVariantGroup = null;
  diamond.Quantity = 1;

  return diamond;
})