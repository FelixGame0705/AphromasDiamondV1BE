import { setSeederFactory } from 'typeorm-extension';
import { DiscountEntity } from 'src/entities/discount.entity';

const usedDiscounts = new Set<string>();

export const discountFactory = setSeederFactory(DiscountEntity, (faker) => {
  const discounts = [
    { name: 'Wedding Sale', startMonth: 8, endMonth: 2, crossYear: true },
    { name: 'Glistening Christmas Sale', month: 12 },
    { name: 'Black Friday', month: 11 },
    { name: 'Valentine\'s Day', month: 2 },
    { name: 'Cyber Monday', month: 11 },
    { name: 'Diamond Day', month: 4 },
    { name: 'Golden Month', month: 10 },
    { name: 'Summer Sparkle', month: 7 },
    { name: 'Spring Blossoms', month: 4 }
  ];

  // Nếu tất cả khuyến mãi đã được sử dụng, reset lại
  if (usedDiscounts.size === discounts.length) {
    usedDiscounts.clear();
  }

  // Chọn một khuyến mãi chưa được sử dụng
  let selectedDiscount;
  do {
    selectedDiscount = faker.helpers.arrayElement(discounts);
  } while (usedDiscounts.has(selectedDiscount.name));

  // Đánh dấu khuyến mãi đã được sử dụng
  usedDiscounts.add(selectedDiscount.name);

  const discount = new DiscountEntity();
  discount.Name = `${selectedDiscount.name} Discount`;
  discount.Description = faker.lorem.sentence();

  const currentYear = new Date().getFullYear();
  let startDate, endDate;

  if ('crossYear' in selectedDiscount) {
    if (faker.datatype.boolean()) {
      startDate = new Date(currentYear, selectedDiscount.startMonth - 1, 1);
      endDate = new Date(currentYear + 1, selectedDiscount.endMonth - 1, 28);
    } else {
      startDate = new Date(currentYear - 1, selectedDiscount.startMonth - 1, 1);
      endDate = new Date(currentYear, selectedDiscount.endMonth - 1, 28);
    }
    startDate.setDate(faker.datatype.number({ min: 1, max: 18 }));
    endDate.setDate(faker.datatype.number({ min: 10, max: 28 }));
  } else {
    const month = selectedDiscount.month - 1;
    startDate = new Date(currentYear, month, 1);
    endDate = new Date(currentYear, month + 1, 0);
    const daysInMonth = endDate.getDate();
    startDate.setDate(faker.datatype.number({ min: 1, max: daysInMonth - 10 }));
    endDate.setDate(faker.datatype.number({ min: startDate.getDate() + 10, max: daysInMonth }));
  }

  discount.StartDate = startDate;
  discount.EndDate = endDate;

  discount.PercentDiscounts = faker.datatype.number({ min: 3, max: 15 });
  discount.FinalPrice = null;

  return discount;
});