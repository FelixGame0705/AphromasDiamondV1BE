import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class FeedbackDTO{
    FeedbackID: number

    @ApiProperty({ example: 5.0, description: "number of rating stars" })
    @IsNumber()
    Stars: number

    @ApiProperty({ example: "Chất lượng sản phẩm rất tốt!", description: "comment" })
    @IsString()
    Comment: string

    @ApiProperty({ example: '01-01-2024 00:00:00', description: "date of review" })
    @ToDatabaseDateTime()
    CommentTime: Date

    @ApiProperty({ example: true, description: "Feedback" })
    IsActive: boolean

    @ApiProperty({ example: null, description: "Feedback" })
    DiamondID: number

    @ApiProperty({ example: null, description: "Feedback" })
    JewelrySettingID: number

    @ApiProperty({ example: null, description: "Feedback" })
    OrderID: number  
    
    @ApiProperty({ example: null, description: "Feedback" })
    AccountID: number

    @ApiProperty({ example: null, description: "Feedback" })
    ProductID: number


}