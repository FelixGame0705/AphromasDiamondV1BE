import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNumber, IsOptional } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class VoucherDTO{
    VoucherID: number

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'Discount code effective date' })
    @Type(() => Date)
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'The date the discount code expires' })
    @Type(() => Date)
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