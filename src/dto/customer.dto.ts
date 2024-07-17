import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class CustomerDTO{
    CustomerID: number
    @ApiProperty({ example: '2024-07-16T08:59:40.483Z', description: 'The birthday' })
    @Type(() => Date)
    Birthday: Date
    @ApiProperty({ example: true , description: 'True for man, false for girl' })
    @IsBoolean()
    Gender: boolean
    @ApiProperty({ example: "Love Vietnam" , description: 'Hometown' })
    @IsString()
    Address: string

}