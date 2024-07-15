// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
 import { AccountsEntity } from 'src/entities/accounts.entity';
import * as bcrypt from 'bcrypt';
import { Customer } from '../../src/models/customer.model';
import { Role } from 'src/global/globalEnum';
 
export default setSeederFactory(AccountsEntity, async (faker) => {

    
    const user = new AccountsEntity()
    user.Password = 'User123'
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.Password, salt);

    user.Name = faker.person.firstName();
    user.PhoneNumber = faker.phone.number();
    user.Email = faker.internet.email();
    user.Password = hash;
    user.Role = Role.Customer;
     
  return user;
});
