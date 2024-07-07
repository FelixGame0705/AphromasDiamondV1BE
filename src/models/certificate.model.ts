export class Certificate{
    CertificateID: number
    DiamondID: number

    constructor({CertificateID,DiamondID}){
        if(CertificateID !=undefined) this.CertificateID = CertificateID;
        if(DiamondID != undefined) this.DiamondID =DiamondID;
    }
}