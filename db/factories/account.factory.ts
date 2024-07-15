// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
 import { AccountsEntity } from 'src/entities/accounts.entity';
import { CustomerEntity } from 'src/entities/customer.entity';
 
export default setSeederFactory(AccountsEntity, (faker) => {

    
  const user = new AccountsEntity()

    user.Name = faker.person.firstName();
    user.PhoneNumber = faker.phone.number();
    user.Email = faker.internet.email();
    user.Password = faker.internet.password();
    user.Role = 'ROLE_CUSTOMER';
     
  return user;
});
