export class Account{
    firstName: string;
    lastName:string;
    username: string;
    password: string;
    permission: string;

    constructor({firstName, lastName, username, password, permission}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.permission = permission;
    }
}