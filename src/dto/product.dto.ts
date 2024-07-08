import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class ProductDTO{
    @ApiProperty({example:'1', description:'JewelrySettingID of jewelry'})
    JewelrySettingID: number
    @ApiProperty({example:'ds', description:'Name of jewelry'})
    Name: string
    @ApiProperty({example:'dsd', description:'Inscription of jewelry'})
    Inscription: string
    @ApiProperty({example:'dsd', description:'Inscription Font of jewelry'})
    InscriptionFont: string
    @ApiProperty({example:'dsd', description:'Brand of jewelry'})
    Brand: string
    @ApiProperty({example:'1', description:'AccountID of customer who custom jewelry'})
    AccountID: number
    @ApiProperty({example:'1', description:'CollectionID of jewelry'})
    CollectionID: number
    @ApiProperty({example:'1', description:'DiscountID of jewelry'})
    DiscountID: number
}