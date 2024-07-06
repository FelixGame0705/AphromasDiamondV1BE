import { ApiProperty } from "@nestjs/swagger"

export class ProductDTO{
    @ApiProperty({example:'1', description:'JewelrySettingID of jewelry'})
    JewelrySettingID: number
    @ApiProperty({example:'1', description:'AccountID of customer who custom jewelry'})
    AccountID: number
    @ApiProperty({example:'1', description:'Price of jewelry'})
    Price: number
    @ApiProperty({example:'1', description:'CollectionID of jewelry'})
    CollectionID: number
    @ApiProperty({example:'1', description:'DiscountID of jewelry'})
    DiscountID: number
}