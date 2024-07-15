import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class ProductDTO{
    @ApiProperty({example:'1', description:'JewelrySettingID of jewelry'})
    @IsNumber()
    @IsOptional()
    JewelrySettingID: number|null
    @ApiProperty({example:'ds', description:'Name of jewelry'})
    @IsString()
    Name: string
    @ApiProperty({example:'dsd', description:'Inscription of jewelry'})
    @IsString()
    Inscription: string
    @ApiProperty({example:'dsd', description:'Inscription Font of jewelry'})
    @IsString()
    InscriptionFont: string
    @ApiProperty({example:'dsd', description:'Brand of jewelry'})
    @IsString()
    Brand: string
    @ApiProperty({example:1, description:'AccountID of customer who custom jewelry'})
    @IsNumber()
    @IsOptional()
    AccountID: number|null
    @ApiProperty({example:1, description:'CollectionID of jewelry'})
    @IsNumber()
    @IsOptional()
    CollectionID: number|null
    @ApiProperty({example:1, description:'DiscountID of jewelry'})
    @IsNumber()
    @IsOptional()
    DiscountID: number|null
}