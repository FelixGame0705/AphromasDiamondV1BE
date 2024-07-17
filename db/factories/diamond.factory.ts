import { DiamondEntity } from 'src/entities/diamond.entity';
import { setSeederFactory } from 'typeorm-extension';
import { collectionFactory } from './collection.factory';

export const diamondFactory = setSeederFactory(DiamondEntity, async (faker) => {
  const diamond = new DiamondEntity()

  // Name: fake data với "diamond" ở cuối
  diamond.Name = `${faker.commerce.productName()} Diamond`;

  // Shape: random từ danh sách cho trước
  const shapes = ['round', 'princess', 'emerald', 'marquise', 'oval', 'heart', 'cushion', 'radiant', 'pear'];
  diamond.Shape = faker.helpers.arrayElement(shapes);

  // Price: random
  diamond.Price = parseFloat(faker.commerce.price(1000, 100000, 2));

  // Color: random từ D đến Z
  diamond.Color = String.fromCharCode(faker.datatype.number({ min: 68, max: 90 })); // ASCII cho D-Z

  // WeightCarat: random hợp lý (giả sử từ 0.3 đến 5 carat)
  diamond.WeightCarat = parseFloat(faker.datatype.number({ min: 30, max: 500, precision: 0.01 }).toFixed(2));

  // PercentDepth: random từ 59% đến 63%
  diamond.PercentDepth = parseFloat(faker.datatype.number({ min: 59, max: 63, precision: 0.1 }).toFixed(1));

  // LengthOnWidthRatio: random từ 1.00 đến 1.99
  diamond.LengthOnWidthRatio = parseFloat(faker.datatype.number({ min: 1.00, max: 1.99, precision: 0.01 }).toFixed(2));

  // Description: random
  diamond.Description = faker.lorem.paragraph();

  // IsActive: boolean
  diamond.IsActive = faker.datatype.boolean();

  // Fluorescence: random từ danh sách cho trước
  const fluorescence = ['None', 'Faint', 'Medium', 'Strong', 'Very Strong'];
  diamond.Fluorescence = faker.helpers.arrayElement(fluorescence);

  // Clarity: random từ danh sách cho trước
  const clarity = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  diamond.Clarity = faker.helpers.arrayElement(clarity);

  // PercentTable: random từ 53% đến 58% (giả định dựa trên tiêu chuẩn phổ biến)
  diamond.PercentTable = parseFloat(faker.datatype.number({ min: 53, max: 58, precision: 0.1 }).toFixed(1));

  // Cut 
  const cut = ['Good', 'Very Good', 'Excellent', 'Superior', 'Flawless', 'Very Flawless'];
  diamond.Cut = faker.helpers.arrayElement(cut);
  //polish
  const polish = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Polish = faker.helpers.arrayElement(polish);
  //symmetry
  const symmetry = ['Excellent', 'Very Good', 'Good', 'Average', 'Fair'];
  diamond.Symmetry = faker.helpers.arrayElement(symmetry);
  //charge rate
   diamond.ChargeRate = faker.datatype.number({ min: 0, max: 60, precision: 0.1 }); 
  //UpdateTime
  diamond.UpdateTime = faker.date.recent();
  
  //foreign key
  diamond.JewelrySettingVariantID =  faker.datatype.number({ min: 1, max: 10 });
  diamond.ProductID =faker.datatype.number({ min: 1, max: 10 });
  diamond.CollectionID =  faker.datatype.number({ min: 1, max: 10 });
  diamond.DiscountID = faker.datatype.number({ min: 1, max: 10 });
  
  diamond.Designer = faker.person.fullName();
  diamond.Cutter = faker.person.fullName();
  diamond.IndexVariantGroup = null;
  diamond.Quantity = faker.number.int({ min: 0, max: 20});

  return diamond;
})