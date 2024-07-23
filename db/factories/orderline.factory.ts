import { OrderLineEntity } from "src/entities/orderLine.entity";
import { setSeederFactory } from "typeorm-extension";

export const  orderlineFactory = setSeederFactory(OrderLineEntity, async (faker) => {
     
      
    const orderline = new  OrderLineEntity()
   
    //note :thiếu đơn giá
    //thêm điều kiện nếu có productID thì DiamondID để null và ngược lại
    //cho phép ProductID đc lặp lại  trong bảng OrderLine và chỉ được đếm ProductID để tính quantity 
    //Quantity đếm số lần productID lặp (xử lý trong seeder)
    
    //Giá (tính tổng giá (đơn giá*số lượng) được xử lý trong seeder (lấy từ db lên tính ))
    //lấy giá của productID để tính giá , nếu là diamond thì lấy giá diamond luôn (vì thuôc tính viên kim cương độc nhất )
    // orderline.Price = faker.datatype.number(); 

    //(xử lý trong seeder thêm điều kiện mua số lượng nhiều đc giảm giá (mua trên 3 giảm  5% trên 6 giảm 10% trên 10 giảm 15%))
    // orderline.DiscountPrice = faker.datatype.number(); 

    //foreign keys
    // orderline.OrderID = faker.datatype.number();
    // orderline.DiamondID = faker.datatype.number();
    // orderline.ProductID = faker.datatype.number();
    // orderline.CustomerID = faker.datatype.number();

    return orderline;
  })