 export class JewelryType{
    JewelryTypeID:number
    Name: string 
    
    constructor({JewelryTypeID, Name}){
        if(JewelryTypeID != undefined)this.JewelryTypeID = JewelryTypeID;
        if(Name!= undefined)this.Name = Name;
    }
 }
