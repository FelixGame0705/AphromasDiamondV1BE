export class Voucher{
    VoucherID: number
    StartDate: Date
    EndDate: Date
    PercentDiscounts: number
    //OrderID: number

    constructor({VoucherID, StartDate, EndDate, PercentDiscounts}){
        if(VoucherID != undefined)this.VoucherID= VoucherID;
        if(StartDate != undefined)this.StartDate= StartDate;
        if(EndDate != undefined)this.EndDate= EndDate;
        if(PercentDiscounts !=undefined)this.PercentDiscounts= this.PercentDiscounts;
        //if(OrderID !=undefined)this.OrderID= OrderID;
    }
}