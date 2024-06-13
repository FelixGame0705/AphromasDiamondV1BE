import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsString } from "class-validator"

  export class NotificationDTO{
    NotificationID: number

    @ApiProperty({ example: 'true', description: 'Notifcation' })
    @IsBoolean()
    IsRead: boolean

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'The date the noti was push' })
    @IsDate()
    Date: Date
    
    @ApiProperty({ example: 'Account has been created', description: 'Message' })
    @IsString()
    Message: string
    
    @ApiProperty({ example: 'null', description: 'Account ID' })
    AccountID: number
 }