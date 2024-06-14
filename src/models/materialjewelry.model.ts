import { FromDatabaseDateTime } from "src/constants/date-util"

 export class MaterialJewelry {
    MaterialID: number
    BuyPrice: number
    SellPrice: number
    @FromDatabaseDateTime()
    UpdateTime: Date
    Name: string


    constructor({MaterialID, BuyPrice, SellPrice, UpdateTime, Name}){
        if( MaterialID != undefined)this.MaterialID = MaterialID
        if(BuyPrice != undefined)this.BuyPrice = BuyPrice;
        if(SellPrice !=undefined)this.SellPrice=SellPrice;
        if(UpdateTime !=undefined)this.UpdateTime= BuyPrice;
        if(Name !=undefined)this.Name= Name;
    }
}