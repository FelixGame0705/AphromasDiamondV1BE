import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CertificateDTO{

    CertificateID: number

    @ApiProperty({ example: "GIA" , description: 'Certificate' })
    @IsString()
    Name: string

    @ApiProperty({ example: null , description: 'Certificate' })
    @IsNumber()
    @IsOptional()
    DiamondID: number|null
    
    
}