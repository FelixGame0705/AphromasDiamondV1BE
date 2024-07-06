import { Product } from "src/models/product.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IProductRepository extends AbstractPromise<Product>{
    findRelationById(id: number): Promise<Product>;
}