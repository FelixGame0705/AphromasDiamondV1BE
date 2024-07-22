import { MaterialJewelry } from "./materialjewelry.model"
import { Size } from "./size.model"

export class JewelrySettingVariant{
    JewelrySettingVariantID: number
    SizeID: number
    JewelrySettingID:number
    Size: Size
    MaterialJewelry: MaterialJewelry
    TotalPriceVariant: number
    constructor({JewelrySettingVariantID, SizeID, JewelrySettingID, Size, MaterialJewelry, TotalPriceVariant}){
        if(JewelrySettingVariantID != undefined)this.JewelrySettingVariantID = JewelrySettingVariantID;
        if(SizeID != undefined)this.SizeID = SizeID;
        if(JewelrySettingID !=undefined)this.JewelrySettingID=JewelrySettingID;
        if(Size != undefined) this.Size = Size;
        if(MaterialJewelry != undefined) this.MaterialJewelry = MaterialJewelry;
        if(TotalPriceVariant != undefined)this.TotalPriceVariant = TotalPriceVariant;
    }
}
export class JewelrySettingVariantAll{
    JewelrySettingVariantID: number
    Size: Size
    MaterialJewelry: MaterialJewelry
    // TotalPriceVariant: number
    constructor({JewelrySettingVariantID, Size, MaterialJewelry}){
        if(JewelrySettingVariantID != undefined)this.JewelrySettingVariantID = JewelrySettingVariantID;
        if(Size != undefined) this.Size = Size;
        if(MaterialJewelry != undefined) this.MaterialJewelry = MaterialJewelry;
        // if(TotalPriceVariant != undefined)this.TotalPriceVariant = TotalPriceVariant;
    }
}
