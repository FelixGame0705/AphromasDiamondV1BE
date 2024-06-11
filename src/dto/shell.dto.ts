import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber } from "class-validator"

export class ShellDTO{
    ShellID: number
    @ApiProperty({example: 200, description:"Product cost of shell"})
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