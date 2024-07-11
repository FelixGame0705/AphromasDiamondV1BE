import { ApiProperty } from "@nestjs/swagger"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class CollectionDTO{
    //@ApiProperty({example: 1, description:'Collection ID'})
    CollectionID: number
    @ApiProperty({ example: 'Nhu Nguyen Collection' , description: 'Collection Name' })
    CollectionName: string
    @ApiProperty({ example: 'Nhu Nguyen Collection' , description: 'Description' })
    Description: string
    @ToDatabaseDateTime()
    @ApiProperty({ example: '13-12-2023' , description: 'Debut day' })
    DebutTime: Date
}