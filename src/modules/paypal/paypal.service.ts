import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PayPalService {
    private readonly clientID: string;
    private readonly clientSecret: string;
    private readonly apiURL: string;

    constructor(private readonly httpService: HttpService) {
        this.clientID = process.env.PAYPAL_CLIENT_ID;
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        this.apiURL = 'https://api-m.sandbox.paypal.com';
    }

    async createOrder(amount: number){
        const auth = Buffer
        .from(`${this.clientID}:${this.clientSecret}`)
        .toString('base64');

        const response = await this.httpService.post(
            `${this.apiURL}/v2/checkout/orders`,
            {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: amount.toString(),
                        }
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${auth}`
                }
            }
        ).toPromise();

        return response.data;
    }

    async captureOrder(orderID: string) {
        const auth = Buffer
        .from(`${this.clientID}:${this.clientSecret}`)
        .toString('base64');

        const response = await this.httpService.post(
            `${this.apiURL}/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${auth}`
                }
            }
        ).toPromise();

        return response.data;
    }
}