// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CertificateEntity } from 'src/entities/certificate.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
   // await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
   try {
    console.log('Starting data seeding...');
    const repository = dataSource.getRepository(CertificateEntity);
    await repository.insert({ Name: 'Hello' });
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }

  //   const userFactory = factoryManager.get(AccountsEntity);
  //   // save 1 factory generated entity, to the database
  //   await userFactory.save();

  //   // save 5 factory generated entities, to the database
  //   await userFactory.saveMany(5);
  }
}
