export class Certificate{
    CertificateID: number
    DiamondID: number
    Name: string
<<<<<<< HEAD
 
    constructor({CertificateID,DiamondID,Name}){
        if(CertificateID !=undefined) this.CertificateID = CertificateID;
        if(DiamondID != undefined) this.DiamondID =DiamondID;
        if(Name !=undefined) this.Name = Name;
=======

    constructor({CertificateID, DiamondID, Name}){
        if(CertificateID !=undefined) this.CertificateID = CertificateID;
        if(DiamondID != undefined) this.DiamondID =DiamondID;
        if(Name != undefined) this.Name =Name;
>>>>>>> develop
    }
}