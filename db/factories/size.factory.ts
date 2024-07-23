// import { SizeEntity } from 'src/entities/size.entity';
// import { setSeederFactory } from 'typeorm-extension';

// // Mapping cố định giữa ID, kích thước và giá trị mm
// const sizeMapping = {
//   1: { size: 6, mm: 14.7 },
//   2: { size: 7, mm: 15.6 },
//   3: { size: 8, mm: 16.5 },
//   4: { size: 9, mm: 17.3 },
//   5: { size: 10, mm: 18.2 },
//   6: { size: 11, mm: 19.0 },
//   7: { size: 12, mm: 19.8 },
//   8: { size: 13, mm: 20.6 },
//   9: { size: 14, mm: 21.3 },
//   10: { size: 15, mm: 22.2 },
//   11: { size: 16, mm: 23.0 },
//   12: { size: 17, mm: 23.8 },
//   13: { size: 18, mm: 24.6 },
//   14: { size: 19, mm: 25.4 },
//   15: { size: 20, mm: 26.2 }
// };

// export const sizeFactory = setSeederFactory(SizeEntity, async (faker) => {
//   const size = new SizeEntity()

//   // Chọn một ID ngẫu nhiên từ 1 đến 15
//   const sizeID = faker.datatype.number({ min: 1, max: 15 });

//   // Gán ID cho size
//   size.SizeID = sizeID;

//   // Lấy thông tin kích thước tương ứng với ID
//   const sizeInfo = sizeMapping[sizeID];

//   // Set SizeValue là số kích thước
//   size.SizeValue = sizeInfo.size;

//   // Set UnitOfMeasure là chuỗi định dạng với giá trị mm
//   size.UnitOfMeasure = `(${sizeInfo.mm.toFixed(1)} mm)`;

//   return size;
// })