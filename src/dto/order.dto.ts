import { ApiProperty } from "@nestjs/swagger";
import { IsTimeZone } from "class-validator";
import { ToDatabaseDateTime } from "src/constants/date-util";

export class OrderDTO{
    OrderID: number
    @ApiProperty({ example: '2023-06-07T14:30:00Z', description: 'The date the order was placed' })
    @ToDatabaseDateTime()
    OrderDate: Date;

    @ApiProperty({ example: '2023-06-14T14:30:00Z', description: 'The date the order was completed' })
    @ToDatabaseDateTime()
    CompleteDate: Date;

    @ApiProperty({ example: null, description: 'The ID of the customer' })
    CustomerID: number;

    @ApiProperty({ example: 'Pending', description: 'The status of the order' })
    OrderStatus: string;

    @ApiProperty({ example: true, description: 'Whether the order is active or not' })
    IsActive: boolean;
    @ApiProperty({ example: null, description: 'Whether the order is active or not' })
    AccountDeliveryID: number
    @ApiProperty({ example: null, description: 'Whether the order is active or not' })
    AccountSaleID: number
}