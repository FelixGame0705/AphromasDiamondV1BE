import { ApiProperty } from "@nestjs/swagger";

export class UsingImageDTO{
    @ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
}

export class UsingImageUpdateDTO{
    UsingImageID: number
    ProductID: number
    DiamondID: number
    JewelrySettingID: number
}