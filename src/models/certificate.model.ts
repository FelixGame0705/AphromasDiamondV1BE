export class Certificate{
    CertificateID: number
    DiamondID: number
    Name: string

<<<<<<< HEAD
    constructor({CerID,DiamondID,Name}){
        if(CerID !=undefined) this.CerID = CerID;
=======
    constructor({CertificateID,DiamondID}){
        if(CertificateID !=undefined) this.CertificateID = CertificateID;
>>>>>>> develop
        if(DiamondID != undefined) this.DiamondID =DiamondID;
        if(Name !=undefined) this.Name = Name;
    }
}