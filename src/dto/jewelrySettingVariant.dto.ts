import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class JewelrySettingVariantDTO{
    @ApiProperty({example:1,description:'Shell ID match to shell'})
    @IsOptional()
    @IsNumber()
    SizeID: number|null
    @ApiProperty({example:1,description:'Size ID match to shell'})
    @IsOptional()
    @IsNumber()
    JewelrySettingID: number|null
    @ApiProperty({example:1,description:'Material ID match to shell'})
    @IsOptional()
    @IsNumber()
    MaterialJewelryID: number|null
    @ApiProperty({example:1,description:'Weight'})
    @IsNumber()
    Weight: number
    @ApiProperty({example:1,description:'Quantity'})
    @IsNumber()
    Quantity: number
}