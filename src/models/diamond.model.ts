import { FromDatabaseDateTime } from "src/constants/date-util"
import { UsingImage } from "./usingImage.model"
import { share } from "rxjs"

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
    Shape: string
    UpdateTime: Date
    ProductID: number
    // CollectionID: number
    DiscountID: number
    usingImage: UsingImage[]
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
        Shape,
        UpdateTime,
        ProductID,
        // CollectionID,
        DiscountID,
        usingImage
    }){
            if(DiamondID!=undefined) this.DiamondID;
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
            if(Shape!=undefined) this.Shape = Shape;
            if(UpdateTime!=undefined) this.UpdateTime = UpdateTime;
            if(ProductID!= undefined) this.ProductID = ProductID;
            // if(CollectionID!= undefined) this.CollectionID = CollectionID;
            if(DiscountID!= undefined) this.DiscountID = DiscountID;
            if(usingImage!= undefined) this.usingImage = usingImage;
    }
	
    
	
    
}