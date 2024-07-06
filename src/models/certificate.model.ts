export class Certificate{
    CerID: number
    DiamondID: number
    Name: string

    constructor({CerID,DiamondID,Name}){
        if(CerID !=undefined) this.CerID = CerID;
        if(DiamondID != undefined) this.DiamondID =DiamondID;
        if(Name !=undefined) this.Name = Name;
    }
}