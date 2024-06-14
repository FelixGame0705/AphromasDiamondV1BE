import { ApiProperty } from "@nestjs/swagger"

export class SizeDTO{
    @ApiProperty({example:'1', description:'size of jewelry'})
    SizeValue: number
    @ApiProperty({example:'cm', description:'unit'})
    UnitOfMeasure: string
}