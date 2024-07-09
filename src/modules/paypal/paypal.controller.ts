import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PayPalService } from "./paypal.service";
import { Public } from "src/constants/decorator";
import { PayPalDTO } from "src/dto/paypal.dto";

@ApiTags('PayPal')
@Controller('paypal')
export class PayPalController {
    constructor(private readonly paypalService: PayPalService) {}

    @ApiBody({type: PayPalDTO, description: 'The payment amount'})
    @Post('/create-order')
    @Public()
    async createOrder(@Body('amount') amount: number) {
        return this.paypalService.createOrder(amount);
    }

    @Post('/capture-order/:orderID')
    @Public()
    async captureOrder(@Param('orderID') orderID: number) {
        return this.paypalService.captureOrder(orderID);
    }
}