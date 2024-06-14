import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class CustomerDTO{
    CustomerID: number
    @ApiProperty({ example: '14-06-2002', description: 'The birthday' })
    @ToDatabaseDateTime()
    Birthday: Date
    @ApiProperty({ example: true , description: 'True for man, false for girl' })
    @IsBoolean()
    Gender: boolean
    @ApiProperty({ example: "Love Vietnam" , description: 'Hometown' })
    Address: string

}