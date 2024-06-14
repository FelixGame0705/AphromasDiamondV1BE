import { IsNumber, IsString } from "class-validator"
import { ToDatabaseDateTime } from "../constants/date-util"

export class FeedbackDTO{
    FeedbackID: number
    @IsNumber()
    Stars: number
    @IsString()
    Comments: string
    @ToDatabaseDateTime()
    CommentTime: Date
    IsActive: boolean
    DiamondID: number
    ShellID: number
    OrderID: number
    AccountID: number
}