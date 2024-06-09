import { IsBoolean, IsNumber } from "class-validator"

export class ShellDTO{
    ShellID: number
    @IsNumber()
    ProductionCost: number
    @IsBoolean()
    IsActive: boolean
    @IsNumber()
    Weight: number
    JewelryTypeID: number
    MaterialJewelryID: number
    MaterialID: number
    
}