import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber } from "class-validator"

export class BillDiscountDTO{
    BillDiscountID: number

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'Discount code effective date' })
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'The date the discount code expires' })
    @IsDate()
    EndDate: Date
    
    @ApiProperty({ example: 'Account has been created', description: 'Percent discount apply' })
    @IsNumber()
    PercentDiscounts: number
    
    @ApiProperty({ example: 'null', description: 'Order ID' })
    OrderID: number
}