export class OrderLine{
    OrderLineID: number
    Quantity: number
    OrderID: number
    DiamondID: number
    ShellID: number
    constructor({OrderLineID, Quantity, OrderID, DiamondID, ShellID}){
        this.OrderLineID = OrderLineID
        this.Quantity = Quantity
        this.OrderID = OrderID
        this.DiamondID = DiamondID
        this.ShellID = ShellID
    }
}