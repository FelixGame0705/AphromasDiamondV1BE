import { ApiProperty } from "@nestjs/swagger"

export class CertificateDTO{
    CertificateID: number
    @ApiProperty({ example: null , description: 'Diamond' })
    DiamondID: number
}