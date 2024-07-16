import { FromDatabaseDateTime } from "src/constants/date-util"

 export class MaterialJewelry {
    MaterialJewelryID: number
    BuyPrice: number
    SellPrice: number
    UpdateTime: Date
    Name: string


    constructor({MaterialJewelryID, BuyPrice, SellPrice, UpdateTime, Name}){
        if( MaterialJewelryID != undefined)this.MaterialJewelryID = MaterialJewelryID
        if(BuyPrice != undefined)this.BuyPrice = BuyPrice;
        if(SellPrice !=undefined)this.SellPrice=SellPrice;
        if(UpdateTime !=undefined)this.UpdateTime= BuyPrice;
        if(Name !=undefined)this.Name= Name;
    }
}