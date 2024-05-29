export class AuthResponseDTO{
    id: number;
    username: string;
    role: string;

    constructor({id, username, role}){
        this.id = id;
        this.username = username;
        this.role = role;

        return this;
    };
}

// 
export class AuthPayloadDTO{
    username: string;
    password: string;
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