export class Discount{
    DiscountID: number
    Name:string
    Description:string
    PercentDiscounts: number
    FinalPrice:number
    StartDate: Date
    EndDate: Date

    constructor({DiscountID, Name, Description, PercentDiscounts, FinalPrice, StartDate, EndDate}){
        if(DiscountID != undefined)this.DiscountID= DiscountID;
        if(Name != undefined)this.Name= Name;
        if(Description != undefined)this.Description= Description;
        if(StartDate != undefined)this.StartDate= StartDate;
        if(EndDate != undefined)this.EndDate= EndDate;
        if(PercentDiscounts !=undefined)this.PercentDiscounts = Number(PercentDiscounts);
        if(FinalPrice!=undefined)this.FinalPrice= FinalPrice;
    }
}