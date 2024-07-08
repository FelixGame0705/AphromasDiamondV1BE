import { ApiProperty } from "@nestjs/swagger"

export class JewelrySettingVariantDTO{
    @ApiProperty({example:1,description:'Shell ID match to shell'})
    SizeID: number
    @ApiProperty({example:1,description:'Size ID match to shell'})
    JewelrySettingID: number
    @ApiProperty({example:1,description:'Material ID match to shell'})
    MaterialJewelryID: number
    @ApiProperty({example:1,description:'Weight'})
    Weight: number
    @ApiProperty({example:1,description:'Amount'})
    Amount: number
}