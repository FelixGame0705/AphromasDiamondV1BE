export class Shell{
    ShellID: number
    ProductionCost: number
    IsActive: boolean
    Weight: number

    constructor({ShellID,ProductionCost,IsActive,Weight}){
        if(ShellID != undefined)this.ShellID = ShellID;
        if(ProductionCost != undefined)this.ProductionCost = ProductionCost;
        if(IsActive !=undefined)this.IsActive=IsActive;
        if(Weight !=undefined)this.Weight=Weight;
    
    }
}
