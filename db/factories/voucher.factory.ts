import { VoucherEntity } from "src/entities/voucher.entity";
import { setSeederFactory } from "typeorm-extension";

export const  voucherFactory = setSeederFactory(VoucherEntity, async (faker) => {
    
    const voucher = new  VoucherEntity()
    voucher.VoucherCode = faker.random.alphaNumeric(10);
    voucher.Description = faker.lorem.sentence();
    voucher.StartDate= faker.date.recent();
    voucher.EndDate = faker.date.future();
    voucher.PercentDiscounts = faker.datatype.number({ min: 0, max: 100 });
        
    return voucher;
  })