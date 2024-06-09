export class Account{
    firstName: string;
    lastName:string;
    username: string;
    password: string;
    role: string;

    constructor({firstName, lastName, username, password, role}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}