import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PayPalDTO {
    @ApiProperty({example: 100, description: 'the amount to pay'})
    @IsNumber()
    amount: number;
}