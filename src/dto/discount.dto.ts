import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class DiscountDTO{
    DiscountID: number

    @ApiProperty({example: 'Name of Discount' , description: 'Discount'})
    @IsString()
    Name: string

    @ApiProperty({example: 'Giảm giá giành riêng cho sản phẩm đấy' , description: 'Discount'})
    @IsString()
    Description: string

    @ApiProperty({example: 'Phần trăm được giảm' , description: 'Discount'})
    @IsNumber()
    PercentDiscounts: number

    @ApiProperty({example: 'Price of product after add discount' , description: 'Discount'})
    @IsNumber()
    FinalPrice: number

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'The date the discount code expires' })
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'End Date of Discount' })
    @IsDate()                                              
    EndDate: Date
}