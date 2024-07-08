import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CertificateDTO{
<<<<<<< HEAD
    CerID: number

    @ApiProperty({ example: "GIA" , description: 'Certificate' })
    @IsString()
    Name: string

    @ApiProperty({ example: null , description: 'Certificate' })
=======
    CertificateID: number
    @ApiProperty({ example: null , description: 'Diamond' })
>>>>>>> develop
    DiamondID: number
    
    
}