import { Diamond } from "src/models/diamond.model";
import { AbstractPromise } from "./AbstractRepository";
import { Customer } from "src/models/customer.model";

export interface ICustomerRepository extends AbstractPromise<Customer>{
    // findRelationById(id: number): Promise<Customer>;
    updateCustomer(username:string, customer:Customer): Promise<Customer>;
}