import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class ProductDTO{
    ProductID:number
    @IsNumber()
    @ApiProperty({example:null, description:"ID of shell"})
    ShellID: number
    @ApiProperty({example: true, description:"Is banned"})
    IsActive: boolean
}