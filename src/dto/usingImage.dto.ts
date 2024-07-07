import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UsingImageDTO{
    @ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
    @ApiPropertyOptional({example:'', description:'id product'})
    ProductID?: number
    @ApiPropertyOptional({example:'', description:'id diamond'})
    DiamondID?: number
    @ApiPropertyOptional({example:'', description:'id jewelry'})
    JewelrySettingID?: number
    @ApiPropertyOptional({example:'', description:'id certificate'})
    CertificateID?: number
}

export class UsingImageUpdateDTO{
    UsingImageID: number
    @ApiProperty({example:'1', description:'id product'})
    ProductID: number
    @ApiProperty({example:'1', description:'id diamond'})
    DiamondID: number
    @ApiProperty({example:'1', description:'id jewelry'})
    JewelrySettingID: number
    @ApiProperty({example:'1', description:'id certificate'})
    CertificatID: number
}