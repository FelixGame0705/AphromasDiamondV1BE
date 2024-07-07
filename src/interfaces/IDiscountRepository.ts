import { Discount } from "src/models/discount.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IDiscountRepository extends AbstractPromise<Discount>{
    findRelationById(id: number): Promise<Discount>;
     
}