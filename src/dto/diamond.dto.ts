import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsPhoneNumber, IsString } from "class-validator"
import { ToDatabaseDateTime } from "src/constants/date-util"

export class DiamondDTO{
    DiamondID: number
    @ApiProperty({ example: "Kim cuong" , description: 'Diamond' })
    @IsString()
    Name: string
    @ApiProperty({ example: "Beautiful" , description: 'Diamond' })
    @IsString()
    Cut: string
    @ApiProperty({ example: 1000 , description: 'Diamond' })
    @IsNumber()
    Price: number
    @ApiProperty({ example: "D" , description: 'Diamond' })
    @IsString()
    Color: string
    @ApiProperty({ example: 1.7 , description: 'Diamond' })
    @IsNumber()
    WeightCarat: number
    @ApiProperty({ example: 12, description: 'Diamond' })
    @IsNumber()
    PercentDepth: number
    @ApiProperty({ example: 12 , description: 'Diamond' })
    @IsNumber()
    LengthOnWidthRatio: number
    @ApiProperty({ example: "Đẹp quá" , description: 'Diamond' })
    @IsString()
    Description: string
    @ApiProperty({ example: true , description: 'Diamond' })
    @IsBoolean()
    IsActive: boolean
    @ApiProperty({ example: "no" , description: 'Diamond' })
    @IsString()
    Fluorescence: string
    @ApiProperty({ example: "Vip" , description: 'Diamond' })
    Clarity: string
    @ApiProperty({ example: 15 , description: 'Diamond' })
    PercentTable: number
    @ApiProperty({ example: "no" , description: 'Diamond' })
    Polish: string
    @ApiProperty({ example: "no" , description: 'Diamond' })
    Symmetry: string
    @ApiProperty({ example: 120 , description: 'Diamond' })
    ChargeRate: number

    @ApiProperty({ example: "Cutter" , description: 'cutter' })
    @IsString()
    Cutter: string
    
    @ApiProperty({ example: "Square" , description: 'Diamond' })
    @IsString()
    Shape: string
    
    @ApiProperty({example: '01-01-2024 00:00:00'})
    @ToDatabaseDateTime()
    UpdateTime: Date
    // @ApiProperty({ example: null , description: 'Diamond' })
    // JewelrySettingID: number
    @ApiProperty({ example: null , description: 'Diamond' })
    ProductID: number
    @ApiProperty({ example: null , description: 'Diamond' })
    CollectionID: number
    @ApiProperty({ example: null , description: 'Diamond' })
    DiscountID: number
    @ApiProperty({example: null, description: 'Jewelry setting variant id dùng để tạo sản phẩm sẵn, nối diamond với vỏ'})
    JewelrySettingVariantID: number
}