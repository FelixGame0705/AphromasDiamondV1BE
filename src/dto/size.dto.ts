import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class SizeDTO{
    @ApiProperty({example:1, description:'size of jewelry'})
    @IsNumber()
    SizeValue: number
    @ApiProperty({example:'cm', description:'unit'})
    @IsString()
    UnitOfMeasure: string
}