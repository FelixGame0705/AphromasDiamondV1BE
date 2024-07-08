import { ApiProperty } from "@nestjs/swagger";

export class PayPalDTO {
    @ApiProperty({example: '100', description: 'the amount to pay'})
    amount: number;
}