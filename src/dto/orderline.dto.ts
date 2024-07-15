import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class OrderLineDTO{
    OrderLineID: number
    @ApiProperty({ example: 1, description: 'Quantity' })    
    @IsNumber()
    @IsOptional()
    Quantity: number|null
    @ApiProperty({ example: 1, description: 'OrderID' })
    @IsNumber()
    @IsOptional()
    OrderID: number|null
    @ApiProperty({ example: null, description: 'DiamondID' })
    @IsNumber()
    @IsOptional()
    DiamondID: number|null
    @ApiProperty({ example: null, description: 'ProductID' })
    @IsNumber()
    @IsOptional()
    ProductID: number|null
    @ApiProperty({ example: null, description: 'CustomerID' })
    @IsNumber()
    @IsOptional()
    CustomerID: number|null
}