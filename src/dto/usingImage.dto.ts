import { ApiProperty } from "@nestjs/swagger";

export class UsingImageDTO{
    @ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
}

export class UsingImageUpdateDTO{
    UsingImageID: number
    @ApiProperty({example:'1', description:'id product'})
    ProductID: number
    @ApiProperty({example:'1', description:'id diamond'})
    DiamondID: number
    @ApiProperty({example:'1', description:'id jewelry'})
    JewelrySettingID: number
}