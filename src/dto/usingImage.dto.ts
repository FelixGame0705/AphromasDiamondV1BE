import { ApiProperty } from "@nestjs/swagger";

export class UsingImageDTO{
    @ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
}