import { IsBoolean, IsDate, IsString } from "class-validator"

  export class NotificationDTO{
    NotificationID: number
    @IsBoolean()
    IsRead: boolean
    @IsDate()
    Date: Date
    @IsString()
    Message: string
    AccountID: number
 }