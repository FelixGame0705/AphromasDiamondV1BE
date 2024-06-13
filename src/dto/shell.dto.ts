import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber } from "class-validator"

export class ShellDTO{
    ShellID: number
    @ApiProperty({example: 200, description:"Product cost of shell"})
    @IsNumber()
    ProductionCost: number

    @ApiProperty({example: true, description:"shell"})
    @IsBoolean()
    IsActive: boolean

    @ApiProperty({example: 200, description:"Weight of shell"})
    @IsNumber()
    Weight: number

    @ApiProperty({example: null, description:"JewelryTypeID"})
    JewelryTypeID: number

    @ApiProperty({example: null, description:" MaterialJewelryID"})
    MaterialJewelryID: number
    
    @ApiProperty({example: null, description:" ID of material"})
    MaterialID: number
    
}