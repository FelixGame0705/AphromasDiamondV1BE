export class JewelrySettingVariant{
    JewelrySettingVariantID: number
    SizeID: number
    JewelrySettingID:number
    TotalPriceVariant: number
    constructor({JewelrySettingVariantID, SizeID, JewelrySettingID,TotalPriceVariant}){
        if(JewelrySettingVariantID != undefined)this.JewelrySettingVariantID = JewelrySettingVariantID;
        if(SizeID != undefined)this.SizeID = SizeID;
        if(JewelrySettingID !=undefined)this.JewelrySettingID=JewelrySettingID;
        if(TotalPriceVariant != undefined)this.TotalPriceVariant = TotalPriceVariant;
    }
}
