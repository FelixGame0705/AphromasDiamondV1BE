import { ApiProperty } from "@nestjs/swagger"

export class OrderLineDTO{
    OrderLineID: number
    @ApiProperty({ example: 1, description: 'Quantity' })    
    Quantity: number
    @ApiProperty({ example: 1, description: 'OrderID' })
    OrderID: number
    @ApiProperty({ example: null, description: 'OrderID' })
    DiamondID: number
    @ApiProperty({ example: null, description: 'OrderID' })
    ProductID: number
}