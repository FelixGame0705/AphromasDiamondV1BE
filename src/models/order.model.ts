import { FromDatabaseDateTime } from "src/constants/date-util"
import { OrderLine } from "./orderline.model"
import { OrderLineEntity } from "src/entities/orderLine.entity"

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
    PaymentID: string
    constructor({OrderID, OrderDate, CompleteDate, CustomerID, OrderStatus, IsActive, AccountDeliveryID,
        AccountSaleID, VoucherID, NameReceived, PhoneNumber, Email, Address, Price, VoucherPrice, PaymentID}
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
        this.PaymentID = PaymentID;
    }
}
export class OrderDetail{
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
    PaymentID: string
    OrderLines: OrderLineEntity[]
    TotalPrice: number
    constructor({OrderID, OrderDate, CompleteDate, CustomerID, OrderStatus, IsActive, AccountDeliveryID,
        AccountSaleID, VoucherID, NameReceived, PhoneNumber, Email, Address, Price, VoucherPrice, PaymentID, OrderLines, TotalPrice}
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
        this.PaymentID = PaymentID;
        this.OrderLines = OrderLines
        this.TotalPrice = TotalPrice    
    }
}

export class OrderSummarize{
    StartDate: Date
    EndDate: Date
    MostRevenueInTime: any
    MostQuantiyInTime: any
    OrderResults: any
    constructor({StartDate, EndDate, OrderResults,MostRevenueInTime,MostQuantiyInTime}){
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.MostRevenueInTime = MostRevenueInTime;
        this.MostQuantiyInTime = MostQuantiyInTime;
        this.OrderResults = OrderResults;
        
    }
}