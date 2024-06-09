import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

export class CustomerDTO{
    CustomerID: number
    @ApiProperty({ example: '2023-06-14', description: 'The birthday' })

    Birthday: Date
    @ApiProperty({ example: true , description: 'True for man, false for girl' })
    @IsBoolean()
    Gender: boolean
    @ApiProperty({ example: "Love Vietnam" , description: 'Hometown' })
    Address: string

}