import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

  export class NotificationDTO{
    NotificationID: number

    @ApiProperty({ example: true, description: 'Notifcation' })
    @IsBoolean()
    IsRead: boolean

    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'The date the noti was push' })
    @IsDate()
    Date: Date
    
    @ApiProperty({ example: 'Account has been created', description: 'Message' })
    @IsString()
    Message: string
    
    @ApiProperty({ example: null, description: 'Account ID' })
    @IsOptional()
    @IsNumber()
    AccountID: number|null
 }