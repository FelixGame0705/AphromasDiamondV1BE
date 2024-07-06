export class JewelrySetting{
    JewelrySettingID: number
    ProductionCost: number
    IsActive: boolean
    Weight: number
    Price: number

    constructor({JewelrySettingID,ProductionCost,IsActive,Weight, Price}){
        if(JewelrySetting != undefined)this.JewelrySettingID = JewelrySettingID;
        if(ProductionCost != undefined)this.ProductionCost = ProductionCost;
        if(IsActive !=undefined)this.IsActive=IsActive;
        if(Weight !=undefined)this.Weight=Weight;
        if(Price != undefined) this.Price = Price;
    }
}
