import { FromDatabaseDateTime } from "src/constants/date-util";

export class Customer {
    CustomerID: number
    Birthday: Date
    Gender: boolean
    Address: string

    constructor({CustomerID, Birthday,Gender, Address}){
        if(CustomerID != undefined)this.CustomerID = CustomerID;
        if(Birthday != undefined) this.Birthday = Birthday;
        if(Gender != undefined)this.Gender = Gender;
        if(Address !=undefined)this.Address=Address;
    }
}