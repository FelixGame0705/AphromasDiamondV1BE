import { OrderLineEntity } from "src/entities/orderLine.entity";
import { setSeederFactory } from "typeorm-extension";

export const  orderlineFactory = setSeederFactory(OrderLineEntity, async (faker) => {
     
      
    const orderline = new  OrderLineEntity()
    orderline.Quantity = faker.datatype.number();
    orderline.OrderID = faker.datatype.number();
    orderline.DiamondID = faker.datatype.number();
    orderline.ProductID = faker.datatype.number();
    orderline.CustomerID = faker.datatype.number();
      
    return orderline;
  })