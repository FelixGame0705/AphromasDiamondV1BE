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