import { JewelrySettingVariant } from "./jewelrySettingVariant.model"

export class JewelrySetting{
    JewelrySettingID: number
    ProductionCost: number
    IsActive: boolean
    Weight: number

    JewelrySettingVariant: JewelrySettingVariant[]
    

    constructor({JewelrySettingID,ProductionCost,IsActive,Weight, JewelrySettingVariant}){
        if(JewelrySetting != undefined)this.JewelrySettingID = JewelrySettingID;
        if(ProductionCost != undefined)this.ProductionCost = ProductionCost;
        if(IsActive !=undefined)this.IsActive=IsActive;
        if(Weight !=undefined)this.Weight=Weight;
        if(JewelrySettingVariant != undefined) this.JewelrySettingVariant = JewelrySettingVariant;
    }
}
