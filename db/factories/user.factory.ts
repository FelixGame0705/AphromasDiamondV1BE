// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { CertificateEntity } from 'src/entities/certificate.entity';

export const userFactory = setSeederFactory(CertificateEntity, (faker) => {
  const user = new CertificateEntity();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.Name = faker.person.firstName(sex);

  return user;
});
