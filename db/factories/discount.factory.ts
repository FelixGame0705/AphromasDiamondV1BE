import { DiscountEntity } from "src/entities/discount.entity";
import { setSeederFactory } from "typeorm-extension";

 
 
export const discountFactory = setSeederFactory(DiscountEntity, async (faker) => {
  const discount = new DiscountEntity()

  const discounts = ['Summer Sale', 'Winter Clearance', 'New Customer Discount', 'Loyalty Reward', 'Holiday Special'];
  discount.Name = faker.helpers.arrayElement(discounts);
  discount.Description = faker.lorem.sentence();
  discount.StartDate = faker.date.recent();
  discount.EndDate = faker.date.future();
  discount.PercentDiscounts = faker.datatype.number({ min: 5, max: 20 });
  discount.FinalPrice = null;

  return discount;
})