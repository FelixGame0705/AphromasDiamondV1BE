import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class JewelryTypeDTO{
    JewelryTypeID:number
    
    @ApiProperty({ example: 'Rings', description: 'Name of material' })
    @IsString()
    Name: string 
}