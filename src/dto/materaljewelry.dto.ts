import { ApiProperty } from "@nestjs/swagger"
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

    @ApiProperty({ example: '07-02-2024 14:30:00', description: 'Date update' })
    @ToDatabaseDateTime()
    @IsDate()
    UpdateTime: Date

    @ApiProperty({ example: 'Gold 18k', description: 'Name' })
    @IsString()
    Name: string

}