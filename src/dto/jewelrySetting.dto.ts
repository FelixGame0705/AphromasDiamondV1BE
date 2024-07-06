import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class JewelrySetting {
    JewelrySetting: number
    @ApiProperty({ example: 200, description: "Product cost of shell" })
    @IsNumber()
    ProductionCost: number

    @ApiProperty({ example: 200, description: "Auxiliary cost of shell" })
    @IsNumber()
    AuxiliaryCost: number

    @ApiProperty({ example: true, description: "shell" })
    @IsBoolean()
    IsActive: boolean

    @ApiProperty({ example: 200, description: "Weight of shell" })
    @IsNumber()
    Weight: number
    @ApiProperty({ example: '01-10-2023 00:00:00' })
    @ToDatabaseDateTime()
    UpdateTime: Date

    @ApiProperty({ example: null, description: "JewelryTypeID" })
    JewelryTypeID: number

    @ApiProperty({ example: null, description: " MaterialJewelryID" })
    MaterialJewelryID: number

    @ApiProperty({ example: null, description: " ID of material" })
    MaterialID: number

}