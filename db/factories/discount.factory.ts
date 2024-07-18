import { DiscountEntity } from "src/entities/discount.entity";
import { setSeederFactory } from "typeorm-extension";

 
 
export const discountFactory = setSeederFactory(DiscountEntity, async (faker) => {
  const discount = new DiscountEntity()

  const discounts = ['Summer Sale', 'Christmas', 'Black Friday', 'Valentine\'s Day', 'Cyber Monday', 'Thanksgiving',];
  discount.Name = `${faker.helpers.arrayElement(discounts)} Discount`;
  discount.Description = faker.lorem.sentence();
  discount.StartDate = faker.date.recent();
  discount.EndDate = faker.date.future();
  discount.PercentDiscounts = faker.datatype.number({ min: 5, max: 20 });
  discount.FinalPrice = null;

  return discount;
})