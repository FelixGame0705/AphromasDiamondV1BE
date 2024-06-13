import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsPhoneNumber } from "class-validator";
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
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: 'PhoneNumber', description: 'phone' })
    PhoneNumber: string;
    @ApiProperty({ example: 'InputUsername', description: 'Username is uniqe' })
    Username: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
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
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: '0979969406', description: 'Phone' })
    @IsPhoneNumber()
    PhoneNumber: string;
    @ApiProperty({ example: 'InputUsername', description: 'Username is uniqe' })
    Username: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
    Password: string;
    @ApiProperty({example: Role.Admin, description: 'Role'})
    @IsEnum(Role)
    Role: Role;
    @ApiProperty({example:'20-11-1990',description:'dd/mm/yyyy'})
    Birthday: Date;
    @ApiProperty({example:true, description:'true for man, false for women'})
    Gender: boolean;
    @ApiProperty({example:'Tay Ninh', description:'Address'})
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
    @ApiProperty({ example: 'Name of account', description: 'Name' })
    Name: string;
    @ApiProperty({ example: '0979969406', description: 'Phone' })
    @IsPhoneNumber()
    PhoneNumber: string;
    @ApiProperty({ example: 'InputUsername', description: 'Username is uniqe' })
    Username: string;
    @ApiProperty({ example: 'duongso14', description: 'password' })
    Password: string;
    @ApiProperty({example:'20-11-1990',description:'dd/mm/yyyy'})
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