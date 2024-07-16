import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class CollectionDTO{
    //@ApiProperty({example: 1, description:'Collection ID'})
    CollectionID: number
    @ApiProperty({ example: 'Nhu Nguyen Collection' , description: 'Collection Name' })
    @IsString()
    CollectionName: string
    @ApiProperty({ example: 'Nhu Nguyen Collection' , description: 'Description' })
    @IsString()
    Description: string
    @ApiProperty({ example: '2024-07-16T08:59:40.483Z' , description: 'Debut day' })
    DebutTime: Date
}