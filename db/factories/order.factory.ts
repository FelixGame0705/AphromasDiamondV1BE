
import { setSeederFactory } from 'typeorm-extension';
import { OrderEntity } from 'src/entities/order.entity';
import { getRepository } from 'typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { addDays } from 'date-fns';

export const orderFactory = setSeederFactory(OrderEntity, async (faker) => {

  // Lấy các ID hợp lệ từ bảng AccountsEntity theo role
  // const accountRepository = getRepository(AccountsEntity);
  // const deliveryAccounts = await accountRepository.find({ where: { Role: 'ROLE_DELIVERY_STAFF' } });
  // const saleAccounts = await accountRepository.find({ where: { Role: 'ROLE_SALE_STAFF' } });

  // const deliveryAccountIDs = deliveryAccounts.map(account => account.AccountID);
  // const saleAccountIDs = saleAccounts.map(account => account.AccountID);

  const order = new OrderEntity();
  order.OrderDate = faker.date.past();
  console.log('Order Date:', order.OrderDate);
  //complete date sẽ được tính từ 3 đến 5 ngày sau order date
  const randomDaysToAdd = faker.datatype.number({ min: 1, max: 3 }); // Chọn ngẫu nhiên 1 đến 3 ngày
  order.CompleteDate = addDays(order.OrderDate, randomDaysToAdd);
  console.log('Complete Date:', order.CompleteDate);


  order.IsPayed = faker.datatype.boolean();
  
  //reason return
  const reasons = [
    'Defective item',
    'Incorrect item received',
    'Item not as described',
    'Changed my mind',
    'Better price available',
    'Item arrived too late',
    'Item was damaged during shipping'
  ];
  order.ReasonReturn =  faker.helpers.arrayElement(reasons);
  
  //Tự ghi chú
  // order.Note = faker.lorem.sentence();

  //shipping method
  const shippingMethods = ['Standard', 'Expedited' ];
  order.Method = faker.helpers.arrayElement(shippingMethods);
   
  //phí giao hàng 
  let shippingFee;
    if (order.Method === 'Standard') {
      shippingFee = 10.00;  
    } else if (order.Method === 'Expedited') {
      shippingFee = 20.00;  
    }
  order.Shippingfee = shippingFee; 


  //status
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  order.OrderStatus = faker.helpers.arrayElement(statuses); 

  order.IsActive = faker.datatype.boolean();

  order.PaymentID = faker.string.uuid();

  // Foreign key
  // order.AccountDeliveryID = faker.helpers.arrayElement(deliveryAccountIDs);
  // order.AccountSaleID = faker.helpers.arrayElement(saleAccountIDs);
  // order.CustomerID = faker.datatype.number({ min: 1, max: 10 });
  
  
   
  return order;
});


