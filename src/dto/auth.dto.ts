import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsPhoneNumber } from "class-validator";
import { Role } from "src/global/globalEnum";

export class AuthResponseDTO{
    AccountID: number;
    Email: string;
    Role: string;
    constructor({AccountID, Email, Role}){
        this.AccountID = AccountID;
        this.Email = Email;
        this.Role = Role;

        return this;
    };
}

// 
export class AuthPayloadDTO{
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: 'PhoneNumber', description: 'phone' })
    PhoneNumber: string;
    @ApiProperty({ example: 'Email', description: 'Username is uniqe' })
    @IsEmail()
    Email: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
    Password: string;
    @ApiProperty({example: Role.Admin, description: 'Role'})
    @IsEnum(Role)
    Role: Role;
    constructor(Name:string, PhoneNumber:string, Email: string, Password:string, Role:Role){
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.Email = Email;
        this.Password = Password;
        this.Role = Role;
    }
}

export class CustomerInforDTO{
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: '0979969406', description: 'Phone' })
    @IsPhoneNumber()
    PhoneNumber: string;
    @ApiProperty({ example: 'tientran@gmail.com', description: 'Username is uniqe' })
    @IsEmail()
    Email: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
    Password: string;
    @ApiProperty({example: Role.Admin, description: 'Role'})
    @IsEnum(Role)
    Role: Role;
    @ApiProperty({example:true, description:'true for man, false for women'})
    Gender: boolean;
    @ApiProperty({example:'Tay Ninh', description:'Address'})
    Address: string;
    constructor(Name:string, PhoneNumber:string, Email: string, Password:string, Role:Role){
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.Email = Email;
        this.Password = Password;
        this.Role = Role;
    }
}

export class AuthPayloadCustomerDTO{
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: '0979969406', description: 'Phone' })
    @IsPhoneNumber()
    PhoneNumber: string;
    @ApiProperty({ example: 'InputUsername', description: 'Username is uniqe' })
    @IsEmail()
    Email: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
    Password: string;
    @ApiProperty({example:'2024-07-16',description:'yyyy/mm/dd'})
    @Type(() => Date)
    Birthday: Date;
    @ApiProperty({example:true, description:'true for man, false for women'})
    Gender: boolean;
    @ApiProperty({example:'Tay Ninh', description:'Address'})
    Address: string;    AccountID: number
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