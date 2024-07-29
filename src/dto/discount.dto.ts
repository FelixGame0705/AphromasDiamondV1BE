import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class DiscountDTO{
    DiscountID: number

    @ApiProperty({example: 'Name of Discount' , description: 'Discount'})
    @IsString()
    Name: string

    @ApiProperty({example: 'Giảm giá giành riêng cho sản phẩm đấy' , description: 'Discount'})
    @IsString()
    Description: string

    @ApiProperty({example: 12 , description: 'Discount'})
    @IsNumber()
    PercentDiscounts: number

    @ApiProperty({example: 'Price of product after add discount' , description: 'Discount'})
    @IsNumber()
    @IsOptional()
    FinalPrice: number|null

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'The date the discount code expires' })
    @Type(() => Date)
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z1', description: 'End Date of Discount' })
    @Type(() => Date)
    @IsDate()                                              
    EndDate: Date

    @ApiProperty({ example: [1, 2, 3], description: 'Array of product number IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    Products: number[]
    @ApiProperty({ example: [1, 2, 3], description: 'Array of diamond number IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    Diamonds: number[]
}