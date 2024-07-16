import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsOptional } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class VoucherDTO{
    VoucherID: number

    @ApiProperty({ example: '14-07-2024 14:30:00', description: 'Discount code effective date' })
    @ToDatabaseDateTime()
    @IsDate()
    StartDate: Date

    @ApiProperty({ example: '14-07-2024 19:00:00', description: 'The date the discount code expires' })
    @ToDatabaseDateTime()
    @IsDate()
    EndDate: Date
    
    @ApiProperty({ example: 12, description: 'Percent discount apply' })
    @IsNumber()
    PercentDiscounts: number
    
    // @ApiProperty({ example: null, description: 'Order ID' })
    // @IsNumber()
    // @IsOptional()
    // OrderID: number|null
}