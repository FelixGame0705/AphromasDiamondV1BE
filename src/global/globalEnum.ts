import { Admin } from "typeorm";

export enum HttpStatus{
    ERROR = 404,
    SUCCESS = 200
};

export enum HttpMessage{
    ERROR = "Server Internal Error",
    SUCCESS = "Server Response Success"
};

export enum Role{
    Admin = 'ROLE_ADMIN',
    Manager = 'ROLE_MANAGER',
    SaleStaff = 'ROLE_SALE_STAFF',
    DeliveryStaff = 'ROLE_DELIVERY_STAFF',
    Customer = 'ROLE_CUSTOMER'
    
}