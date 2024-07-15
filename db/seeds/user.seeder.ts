// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
 
import { AccountsEntity } from 'src/entities/accounts.entity';
import { CustomerEntity } from 'src/entities/customer.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
   // await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
   try {
    console.log('Starting data seeding...');
    // const repository = dataSource.getRepository(AccountsEntity);
    // await repository.insert({ Name: 'Hello' });
    const customerFactory = factoryManager.get(CustomerEntity);
    const accountFactory = factoryManager.get(AccountsEntity);
    
    const cus = await customerFactory.saveMany(5);
    const cusID = await cus.map(c => c.CustomerID);
    let account = new AccountsEntity();
    for (let i = 0; i < cusID.length; i++) {
      // (await accountFactory.make(accounts[i])).CustomerID = cusID[i];
      // await accountFactory.save(accounts[i]);
      account.CustomerID = cusID[i];
      let a = await accountFactory.save(account[i]);
      // (await dataSource.getRepository(AccountsEntity).findOne({where: {['CustomerID']: cusID[i]}} )).AccountID
      // {where: {[idField]:id} as FindOptionsWhere<BaseEntity>}
      dataSource.getRepository(AccountsEntity).update(a.AccountID, {CustomerID: cusID[i]})
    }
    
    // console.log("Hello "+accounts.)

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }


    // const userFactory = factoryManager.get(AccountsEntity);
    // // save 1 factory generated entity, to the database
    // // await userFactory.save();

    // // save 5 factory generated entities, to the database
    // await userFactory.saveMany(5);
  }
}