
import { setSeederFactory } from 'typeorm-extension';
import { OrderEntity } from 'src/entities/order.entity';
import { getRepository } from 'typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { faker } from '@faker-js/faker';

export const orderFactory = setSeederFactory(OrderEntity, async (faker) => {

  // Lấy các ID hợp lệ từ bảng AccountsEntity theo role
  const accountRepository = getRepository(AccountsEntity);
  const deliveryAccounts = await accountRepository.find({ where: { Role: 'ROLE_DELIVERY_STAFF' } });
  const saleAccounts = await accountRepository.find({ where: { Role: 'ROLE_SALE_STAFF' } });

  const deliveryAccountIDs = deliveryAccounts.map(account => account.AccountID);
  const saleAccountIDs = saleAccounts.map(account => account.AccountID);

  const order = new OrderEntity();
  order.OrderDate = faker.date.past();
  order.CompleteDate = faker.date.recent();
  order.IsPayed = faker.datatype.boolean();
  order.Shippingfee = parseFloat(faker.commerce.price());
  order.ReasonReturn = faker.lorem.sentence();
  order.Note = faker.lorem.sentence();
  order.CustomerID = faker.datatype.number({ min: 1, max: 10 });
  
  // Status
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  order.OrderStatus = faker.helpers.arrayElement(statuses);
  
  order.IsActive = faker.datatype.boolean();
  
  // Foreign key
  order.AccountDeliveryID = faker.helpers.arrayElement(deliveryAccountIDs);
  order.AccountSaleID = faker.helpers.arrayElement(saleAccountIDs);

  order.PaymentID = faker.string.uuid();
  order.Method = faker.lorem.word();
   
  return order;
});


