import { setSeederFactory } from "typeorm-extension";
import { CustomerEntity } from "src/entities/customer.entity";
// import {accountFactory} from "./account.factory";

export default setSeederFactory(CustomerEntity, async (faker) => {

    
    const customer = new CustomerEntity();
    customer.Birthday = faker.date.birthdate();
    customer.Gender = faker.datatype.boolean();
    customer.Address = faker.location.city();
  
    return customer;
  });
