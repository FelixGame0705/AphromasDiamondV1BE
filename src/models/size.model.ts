export class Size{
    SizeID: number
    SizeValue: number
    UnitOfMeasure: string

    constructor({SizeID, SizeValue, UnitOfMeasure}){
        this.SizeID = SizeID
        this.SizeValue = SizeValue
        this.UnitOfMeasure = UnitOfMeasure
    }
}
