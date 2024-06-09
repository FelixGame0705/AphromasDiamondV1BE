import { IsEnum } from "class-validator";
import { Role } from "src/global/globalEnum";

export class AuthResponseDTO{
    AccountID: number;
    Username: string;
    Role: string;
    constructor({AccountID, Username, Role}){
        this.AccountID = AccountID;
        this.Username = Username;
        this.Role = Role;

        return this;
    };
}

// 
export class AuthPayloadDTO{
    Name: string;
    PhoneNumber: string;
    Username: string;
    Password: string;
    @IsEnum(Role)
    Role: Role;
    constructor(Name:string, PhoneNumber:string, Username: string, Password:string, Role:Role){
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.Username = Username;
        this.Password = Password;
        this.Role = Role;
    }
}

export class CustomerInforDTO{
    Name: string;
    PhoneNumber: string;
    Username: string;
    Password: string;
    @IsEnum(Role)
    Role: Role;
    Birthday: Date;
    Gender: boolean;
    Address: string;
    constructor(Name:string, PhoneNumber:string, Username: string, Password:string, Role:Role){
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.Username = Username;
        this.Password = Password;
        this.Role = Role;
    }
}

export class AuthPayloadCustomerDTO{
    Name: string;
    PhoneNumber: string;
    Username: string;
    Password: string;
    Birthday: Date
    Gender: boolean
    Address:string
    AccountID: number
}

//return after login
export class AuthPermission{
    id?: number;
    token: string;
    expredTime: number;

    constructor({id, token, expiredTime}){
        this.id = id;
        this.token = token;
        this.expredTime = expiredTime;
        return this;
    }
};