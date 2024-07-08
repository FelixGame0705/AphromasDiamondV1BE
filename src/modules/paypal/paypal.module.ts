import { Module } from "@nestjs/common";
import { PayPalController } from "./paypal.controller";
import { PayPalService } from "./paypal.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [PayPalController],
    providers: [PayPalService]
})
export class PayPalModule{}