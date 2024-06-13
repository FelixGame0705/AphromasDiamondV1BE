export class Certificate{
    CerID: number
    DiamondID: number

    constructor({CerID,DiamondID}){
        if(CerID !=undefined) this.CerID = CerID;
        if(DiamondID != undefined) this.DiamondID =DiamondID;
    }
}