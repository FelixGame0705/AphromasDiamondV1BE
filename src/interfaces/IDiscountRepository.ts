import { Discount } from "src/models/discount.model";
import { AbstractPromise } from "./AbstractRepository";
import { DiscountEntity } from "src/entities/discount.entity";

export interface IDiscountRepository extends AbstractPromise<DiscountEntity>{
    findRelationById(id: number): Promise<Discount>;
     
}