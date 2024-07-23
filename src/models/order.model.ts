import { FromDatabaseDateTime } from "src/constants/date-util"

export class Order{
    OrderID: number
    OrderDate: Date
    CompleteDate: Date
    CustomerID: number
    OrderStatus: string
    IsActive: boolean
    AccountDeliveryID: number
    AccountSaleID: number
    VoucherID: number
    NameReceived: string
    PhoneNumber: string
    Email: string
    Address: string
    Price: number
    VoucherPrice: number
    constructor({OrderID, OrderDate, CompleteDate, CustomerID, OrderStatus, IsActive, AccountDeliveryID,
        AccountSaleID, VoucherID, NameReceived, PhoneNumber, Email, Address, Price, VoucherPrice}
    ){
        this.OrderID = OrderID;
        this.OrderDate = OrderDate;
        this.CompleteDate = CompleteDate;
        this.CustomerID = CustomerID;
        this.OrderStatus = OrderStatus;
        this.IsActive = IsActive;
        this.AccountDeliveryID = AccountDeliveryID;
        this.AccountSaleID = AccountSaleID;
        this.VoucherID = VoucherID;
        this.NameReceived = NameReceived;
        this.PhoneNumber = PhoneNumber;
        this.Email = Email;
        this.Address = Address;
        this.Price = Number(Price);
        this.VoucherPrice = Number(VoucherPrice);
    }
}