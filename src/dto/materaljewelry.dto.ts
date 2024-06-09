import { IsDate, IsNumber, IsString } from "class-validator"

export class MaterialJewelryDTO{
    MaterialID: number
    @IsNumber()
    BuyPrice: number
    @IsNumber()
    SellPrice: number
    @IsDate()
    UpdateTime: Date
    @IsString()
    Name: string

}