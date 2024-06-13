import { IsNumber, IsString } from "class-validator"

export class FeedbackDTO{
    FeedbackID: number
    @IsNumber()
    Stars: number
    @IsString()
    Comments: string
}