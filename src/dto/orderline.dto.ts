import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class OrderLineDTO{
    OrderLineID: number
    @ApiProperty({ example: 1, description: 'Quantity' })    
    @IsNumber()
    @IsOptional()
    Quantity: number|null
    
    @ApiProperty({ example: null, description: 'Inscription' })
    @IsString()
    @IsOptional()
    Inscription: string|null
    @ApiProperty({ example: null, description: 'InscriptionFont' })
    @IsString()
    @IsOptional()
    InscriptionFont: string|null
    @ApiProperty({ example: 1, description: 'OrderID' })
    @IsNumber()
    @IsOptional()
    OrderID: number|null
    @ApiProperty({ example: null, description: 'DiamondID' })
    @IsNumber()
    @IsOptional()
    DiamondID: number|null
    @ApiProperty({ example: null, description: 'ProductID' })
    @IsNumber()
    @IsOptional()
    ProductID: number|null
    @ApiProperty({ example: null, description: 'CustomerID' })
    @IsNumber()
    @IsOptional()
    CustomerID: number|null
    @ApiProperty({ example: null, description: 'JewelrySettingVariantID' })
    @IsNumber()
    @IsOptional()
    JewelrySettingVariantID: number|null
    @ApiProperty({ example: null, description: 'SizeID' })
    @IsNumber()
    @IsOptional()
    SizeID: number|null
}