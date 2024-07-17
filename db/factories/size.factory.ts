import { SizeEntity } from 'src/entities/size.entity';
import { setSeederFactory } from 'typeorm-extension';

// Bảng tra cứu cho kích thước và giá trị mm tương ứng
const sizeToMmMap = {
  6: 14.7,
  7: 15.6,
  8: 16.5,
  9: 17.3,
  10: 18.2,
  11: 19.0,
  12: 19.8,
  13: 20.6,
  14: 21.3,
  15: 22.2,
  16: 23.0,
  17: 23.8,
  18: 24.6,
  19: 25.4,
  20: 26.2
};

export const sizeFactory = setSeederFactory(SizeEntity, async (faker) => {
  const size = new SizeEntity()
  
  // Generate a random size between 6 and 20
  const sizeNumber = faker.datatype.number({ min: 6, max: 20 });
  
  // Get the corresponding mm value from the lookup table
  const sizeInMm = sizeToMmMap[sizeNumber];
  
  // Set SizeValue as the number
  size.SizeValue = sizeNumber;
  
  // Set UnitOfMeasure as the formatted string
  size.UnitOfMeasure = `(${sizeInMm.toFixed(1)} mm)`;
  
  return size;
})


