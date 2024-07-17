import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class JewelrySettingDTO {
    JewelrySettingID: number

    @ApiProperty({ example: 'Vỏ nhẫn Kim cương Vàng trắng 18K', description: "Name of shell" })
    @IsString()
    Name: string

    @ApiProperty({ example: 200, description: "Product cost of shell" })
    @IsNumber()
    ProductionCost: number

    @ApiProperty({ example: true, description: "shell" })
    @IsBoolean()
    IsActive: boolean

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z' })
    @Type(() => Date)
    UpdateTime: Date

    @ApiProperty({ example: 'Square' })
    @IsString()
    DiamondShape: string

    @ApiProperty({ example: 1, description: "ChargeRate" })
    @IsNumber()
    ChargeRate: number
    
    @ApiProperty({ example: 200, description: "Auxiliary cost of shell" })
    @IsNumber()
    AuxiliaryCost: number

    @ApiProperty({ example: null, description: "JewelryTypeID" })
    @IsNumber()
    @IsOptional()
    JewelryTypeID: number|null
}