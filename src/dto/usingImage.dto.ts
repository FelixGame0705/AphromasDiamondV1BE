import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UsingImageDTO{
    @ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
    @ApiPropertyOptional({example:'', description:'id product'})
    @IsNumber()
    @IsOptional()
    ProductID?: number|null
    @ApiPropertyOptional({example:'', description:'id diamond'})
    @IsNumber()
    @IsOptional()
    DiamondID?: number|null
    @ApiPropertyOptional({example:'', description:'id jewelry'})
    @IsNumber()
    @IsOptional()
    JewelrySettingID?: number|null
    @ApiPropertyOptional({example:'', description:'id certificate'})
    @IsNumber()
    @IsOptional()
    CertificateID?: number|null
}

export class UsingImageUpdateDTO{
    UsingImageID: number
    @ApiProperty({example:'1', description:'id product'})
    @IsNumber()
    @IsOptional()
    ProductID: number|null
    @ApiProperty({example:'1', description:'id diamond'})
    @IsNumber()
    @IsOptional()
    DiamondID: number|null
    @ApiProperty({example:'1', description:'id jewelry'})
    @IsNumber()
    @IsOptional()
    JewelrySettingID: number|null
    @ApiProperty({example:'1', description:'id certificate'})
    @IsNumber()
    @IsOptional()
    CertificatID: number|null
}