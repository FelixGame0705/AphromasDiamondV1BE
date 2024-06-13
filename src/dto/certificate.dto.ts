import { ApiProperty } from "@nestjs/swagger"

export class CertificateDTO{
    CerID: number
    @ApiProperty({ example: null , description: 'Diamond' })
    DiamondID: number
}