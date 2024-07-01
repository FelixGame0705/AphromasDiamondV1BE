export class JewelrySetting{
    JewelrySettingID: number
    ProductionCost: number
    IsActive: boolean
    Weight: number

    constructor({JewelrySettingID,ProductionCost,IsActive,Weight}){
        if(JewelrySetting != undefined)this.JewelrySettingID = JewelrySettingID;
        if(ProductionCost != undefined)this.ProductionCost = ProductionCost;
        if(IsActive !=undefined)this.IsActive=IsActive;
        if(Weight !=undefined)this.Weight=Weight;
    
    }
}
