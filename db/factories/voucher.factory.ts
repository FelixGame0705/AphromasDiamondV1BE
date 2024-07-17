import { VoucherEntity } from "src/entities/voucher.entity";
import { setSeederFactory } from "typeorm-extension";

export const  voucherFactory = setSeederFactory(VoucherEntity, async (faker) => {
     
      
    const  voucher = new  VoucherEntity()
     
     
     
       
    return voucher;
  })