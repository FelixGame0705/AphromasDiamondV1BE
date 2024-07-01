export class JewelrySettingVariant{
    JewelrySettingVariantID: number
    SizeID: number
    JewelrySettingID:number

    constructor({JewelrySettingVariantID, SizeID, JewelrySettingID}){
        if(JewelrySettingVariantID != undefined)this.JewelrySettingVariantID = JewelrySettingVariantID;
        if(SizeID != undefined)this.SizeID = SizeID;
        if(JewelrySettingID !=undefined)this.JewelrySettingID=JewelrySettingID;
    
    }
}
