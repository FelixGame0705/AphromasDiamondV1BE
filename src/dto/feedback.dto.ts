import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class FeedbackDTO{
    FeedbackID: number

    @ApiProperty({ example: 5, description: "number of rating stars" })
    @IsNumber()
    Stars: number

    @ApiProperty({ example: "Chất lượng sản phẩm rất tốt!", description: "comment" })
    @IsString()
    Comment: string

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: "date of review" })
    @Type(() => Date)
    CommentTime: Date

    @ApiProperty({ example: true, description: "Feedback" })
    IsActive: boolean

    @ApiProperty({ example: null, description: "Feedback" })
    @IsOptional()
    @IsNumber()
    DiamondID: number|null

    @ApiProperty({ example: null, description: "Feedback" })
    @IsOptional()
    @IsNumber()
    JewelrySettingID: number|null

    @ApiProperty({ example: null, description: "Feedback" })
    @IsOptional()
    @IsNumber()
    OrderID: number | null 
    
    @ApiProperty({ example: null, description: "Feedback" })
    @IsOptional()
    @IsNumber()
    AccountID: number|null

    @ApiProperty({ example: null, description: "Feedback" })
    @IsOptional()
    @IsNumber()
    ProductID: number|null


}