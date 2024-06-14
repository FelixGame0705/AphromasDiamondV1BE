import { ApiProperty } from "@nestjs/swagger"

export class SizeMatchShellDTO{
    @ApiProperty({example:1,description:'Shell ID match to shell'})
    SizeID: number
    @ApiProperty({example:1,description:'Size ID match to shell'})
    ShellID: number
}