import { setSeederFactory } from "typeorm-extension";
import { CustomerEntity } from "src/entities/customer.entity";
// import {accountFactory} from "./account.factory";

export default setSeederFactory(CustomerEntity, async (faker) => {

    
    const customer = new CustomerEntity();
    customer.Birthday = faker.date.birthdate();
    customer.Gender = faker.datatype.boolean();
    customer.Address = faker.location.city();
    
    // const account = await accountFactory(faker); 
    // customer.account = account;
 
    return customer;
  });
// import { setSeederFactory } from 'typeorm-extension';
// import { CustomerEntity } from 'src/entities/customer.entity';
// import { AccountsEntity } from 'src/entities/accounts.entity';
// import { Role } from 'src/global/globalEnum';

// export default setSeederFactory(CustomerEntity, (faker) => {
//   const customer = new CustomerEntity();
//   customer.Birthday = faker.date.past(30, new Date(2000, 0, 1));
//   customer.Gender = faker.datatype.boolean();
//   customer.Address = faker.address.streetAddress();

//   // Tạo một đối tượng account
//   const account = new AccountsEntity();
//   account.Name = faker.person.firstName();
//   account.PhoneNumber = faker.phone.number();
//   account.Email = faker.internet.email();
//   account.Password = faker.internet.password();
//   account.Role = Role.Customer;

//   // Gán account cho customer
//   customer.account = account;

//   return customer;
// });
