import { CustomerEntity } from 'src/entities/customer.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { DataSource } from 'typeorm';
import { setSeederFactory } from 'typeorm-extension';



export const orderFactory = setSeederFactory(OrderEntity, async (faker) => {
  
    
    const order = new OrderEntity()
    order.OrderDate = faker.date.past();
    order.CompleteDate = faker.date.recent();
    order.IsPayed = faker.datatype.boolean();
    order.Shippingfee = parseFloat(faker.commerce.price());
    order.ReasonReturn = faker.lorem.sentence();
    order.Note = faker.lorem.sentence();
    order.CustomerID = faker.datatype.number({ min: 1, max: 10 });
    order.OrderStatus = faker.lorem.word();
    order.IsActive = faker.datatype.boolean();
    
    // Set these fields to null or undefined
    order.AccountDeliveryID = null;
    order.AccountSaleID = null;
    order.PaymentID = null;
    
    order.Method = faker.lorem.word();
     
  return order;
})


