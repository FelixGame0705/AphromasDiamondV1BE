import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"
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

    @ApiProperty({ example: '14-06-2023 14:30:00', description: 'The date the discount code expires' })
    @ToDatabaseDateTime()
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '14-06-2023 14:30:00', description: 'End Date of Discount' })
    @ToDatabaseDateTime()
    @IsDate()                                              
    EndDate: Date
}