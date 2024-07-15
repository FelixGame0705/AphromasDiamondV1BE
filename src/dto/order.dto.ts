import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsTimeZone } from "class-validator";
import { ToDatabaseDateTime } from "src/constants/date-util";
import { DiamondDTO } from "./diamond.dto";

export class OrderDTO {
    OrderID: number
    @ApiProperty({ example: '2023-06-07T14:30:00Z', description: 'The date the order was placed' })
    @ToDatabaseDateTime()
    OrderDate: Date;

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'The date the order was completed' })
    @ToDatabaseDateTime()
    CompleteDate: Date;

    @ApiProperty({ example: false, description: 'Is payed' })
    @IsBoolean()
    IsPayed: boolean;
    @ApiProperty({ example: null, description: 'Shipping fee' })
    @IsNumber()
    @IsOptional()
    Shippingfee: number|null;
    @ApiProperty({ example: null, description: 'Reason return' })
    @IsString()
    @IsOptional()
    ReasonReturn: string|null;
    @ApiProperty({ example: null, description: 'Note' })
    @IsString()
    @IsOptional()
    Note: string|null;
    @ApiProperty({ example: null, description: 'The ID of the customer' })
    @IsNumber()
    @IsOptional()
    CustomerID: number|null;

    @ApiProperty({ example: 'Pending', description: 'The status of the order' })
    @IsString()
    OrderStatus: string;

    @ApiProperty({ example: true, description: 'Whether the order is active or not' })
    @IsBoolean()
    IsActive: boolean;
    @ApiProperty({ example: null, description: 'Whether the order is active or not' })
    @IsNumber()
    @IsOptional()
    AccountDeliveryID: number|null
    @ApiProperty({ example: null, description: 'Whether the order is active or not' })
    @IsNumber()
    @IsOptional()
    AccountSaleID: number|null
}
export class PaymentDTO {
    @ApiProperty({ example: 'Complete', description: 'The status of the order' })
    Order: OrderDTO;
    @ApiProperty({ example: false, description: 'The status of the order' })
    Diamond: DiamondDTO;
}