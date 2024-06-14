import { FromDatabaseDateTime } from "../constants/date-util"

export class Diamond{
    DiamondID: number
    Name: string
    Cut: string
    Price: number
    Color: string
    WeightCarat: number
    PercentDepth: number
    LengthOnWidthRatio: number
    Description: string
    IsActive: boolean
    Fluorescence: string
    Clarity: string
    PercentTable: number
    Polish: string
    Symmetry: string
    ChargeRate: number
    @FromDatabaseDateTime()
    UpdateTime: Date
    ShellID: number
    constructor({
        DiamondID,
        Name,
        Cut,
        Price,
        Color,
        WeightCarat,
        PercentDepth,
        LengthOnWidthRatio,
        Description,
        IsActive,
        Fluorescence,
        Clarity,
        PercentTable,
        Polish,
        Symmetry,
        ChargeRate,
        UpdateTime,
        ShellID}){
            if(ShellID != undefined) this.ShellID = ShellID;
            if(Name!= undefined) this.Name = Name;
            if(Cut!= undefined) this.Cut = Cut;
            if(Price!= undefined) this.Price = Price;
            if(Color!= undefined) this.Color = Color;
            if(WeightCarat!= undefined) this.WeightCarat = WeightCarat;
            if(PercentDepth!= undefined) this.PercentDepth = PercentDepth;
            if(LengthOnWidthRatio!= undefined) this.LengthOnWidthRatio = LengthOnWidthRatio;
            if(Description!= undefined) this.Description = Description;
            if(IsActive!= undefined) this.IsActive = IsActive;
            if(Fluorescence!= undefined) this.Fluorescence = Fluorescence;
            if(Clarity!= undefined) this.Clarity = Clarity;
            if(PercentTable!= undefined) this.PercentTable = PercentTable;
            if(Polish!= undefined) this.Polish = Polish;
            if(Symmetry!= undefined) this.Symmetry = Symmetry;
            if(ChargeRate!= undefined) this.ChargeRate = ChargeRate;
            if(UpdateTime!=undefined) this.UpdateTime = UpdateTime;
            if(ShellID!= undefined) this.ShellID = ShellID;
    }
	
    
	
    
}