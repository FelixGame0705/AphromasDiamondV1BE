import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsOptional } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class VoucherDTO{
    VoucherID: number

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'Discount code effective date' })
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'The date the discount code expires' })
    @IsDate()
    EndDate: Date
    
    @ApiProperty({ example: 12, description: 'Percent discount apply' })
    @IsNumber()
    PercentDiscounts: number
    
    @ApiProperty({ example: null, description: 'Order ID' })
    @IsNumber()
    @IsOptional()
    OrderID: number|null
}