import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNumber, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class MaterialJewelryDTO{
    MaterialJewelryID: number

    @ApiProperty({ example: 12000, description: 'Buy price' })
    @IsNumber()
    BuyPrice: number

    @ApiProperty({ example: 12000, description: 'Sell price' })
    @IsNumber()
    SellPrice: number

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'Date update' })
    @Type(() => Date)
    @IsDate()
    UpdateTime: Date

    @ApiProperty({ example: 'Gold 18k', description: 'Name' })
    @IsString()
    Name: string

}