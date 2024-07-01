export class OrderLine{
    OrderLineID: number
    Quantity: number
    OrderID: number
    DiamondID: number
    ProductID: number
    CustomerID: number
    constructor({OrderLineID, Quantity, OrderID, DiamondID, ProductID, CustomerID}){
        this.OrderLineID = OrderLineID
        this.Quantity = Quantity
        this.OrderID = OrderID
        this.DiamondID = DiamondID
        this.ProductID = ProductID
        this.CustomerID = CustomerID
    }
}