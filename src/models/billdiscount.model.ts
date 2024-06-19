export class BillDiscount{
    BillDiscountID: number
    StartDate: Date
    EndDate: Date
    PercentDiscounts: number
    OrderID: number

    constructor({BillDiscountID, StartDate, EndDate, PercentDiscounts, OrderID}){
        if(BillDiscount != undefined)this.BillDiscountID= BillDiscountID;
        if(StartDate != undefined)this.StartDate= StartDate;
        if(EndDate != undefined)this.EndDate= EndDate;
        if(PercentDiscounts !=undefined)this.PercentDiscounts= this.PercentDiscounts;
        if(OrderID !=undefined)this.OrderID= OrderID;
    }
}