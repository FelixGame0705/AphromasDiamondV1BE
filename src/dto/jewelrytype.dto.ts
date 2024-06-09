import { IsString } from "class-validator"

export class JewelryTypeDTO{
    JewelryTypeID:number
    @IsString()
    Name: string 
}