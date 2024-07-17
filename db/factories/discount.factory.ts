import { DiscountEntity } from "src/entities/discount.entity";
import { setSeederFactory } from "typeorm-extension";

// Mapping cố định giữa ID và loại giảm giá
const discountMapping = {
  1: 'Summer Sale',
  2: 'Winter Clearance',
  3: 'New Customer Discount',
  4: 'Loyalty Reward',
  5: 'Holiday Special'
};

export const discountFactory = setSeederFactory(DiscountEntity, async (faker) => {
  const discount = new DiscountEntity()

  // Chọn một ID ngẫu nhiên từ 1 đến 5
  const discountID = faker.datatype.number({ min: 1, max: 5 });

  // Gán ID cho discount
  discount.DiscountID = discountID;

  // Lấy tên giảm giá tương ứng với ID
  discount.Name = discountMapping[discountID];
 
  discount.Description = faker.lorem.sentence();
  discount.StartDate = faker.date.recent();
  discount.EndDate = faker.date.future();
  discount.PercentDiscounts = faker.datatype.number({ min: 5, max: 20 });
  discount.FinalPrice = null;

  return discount;
})