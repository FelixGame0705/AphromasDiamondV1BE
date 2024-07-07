export class JewelrySettingVariant{
    JewelrySettingVariantID: number
    SizeID: number
    JewelrySettingID:number
    Price: number
    constructor({JewelrySettingVariantID, SizeID, JewelrySettingID,Price}){
        if(JewelrySettingVariantID != undefined)this.JewelrySettingVariantID = JewelrySettingVariantID;
        if(SizeID != undefined)this.SizeID = SizeID;
        if(JewelrySettingID !=undefined)this.JewelrySettingID=JewelrySettingID;
        if(Price != undefined)this.Price = Price;
    }
}
