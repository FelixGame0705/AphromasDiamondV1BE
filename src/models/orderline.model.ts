export class OrderLine{
    OrderLineID: number
    Quantity: number
    OrderID: number
    DiamondID: number
    ProductID: number
    constructor({OrderLineID, Quantity, OrderID, DiamondID, ProductID}){
        this.OrderLineID = OrderLineID
        this.Quantity = Quantity
        this.OrderID = OrderID
        this.DiamondID = DiamondID
        this.ProductID = ProductID
    }
}