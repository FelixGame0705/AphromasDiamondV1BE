import { IsBoolean, IsNumber, IsPhoneNumber, IsString } from "class-validator"

export class DiamondDTO{
    DiamondID: number
    @IsString()
    Name: string
    @IsString()
    Cut: string
    @IsNumber()
    Price: number
    @IsString()
    Color: string
    @IsNumber()
    WeightCarat: number
    @IsNumber()
    PercentDepth: number
    @IsNumber()
    LengthOnWidthRatio: number
    @IsString()
    Description: string
    @IsBoolean()
    IsActive: boolean
    @IsString()
    Fluorescence: string
    Clarity: string
    PercentTable: number
    Polish: string
    Symmetry: string
    ChargeRate: number
    ProductID: number
}