export class SizeMatchShell{
    SizeMatchShellID: number
    SizeID: number
    ShellID:number

    constructor({SizeMatchShellID, SizeID, ShellID}){
        if(SizeMatchShellID != undefined)this.SizeMatchShellID = SizeMatchShellID;
        if(SizeID != undefined)this.SizeID = SizeID;
        if(ShellID !=undefined)this.ShellID=ShellID;
    
    }
}
