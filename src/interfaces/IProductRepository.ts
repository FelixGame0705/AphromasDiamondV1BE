import { Product } from "src/models/product.model";
import { AbstractPromise } from "./AbstractRepository";
import { ProductEntity } from "src/entities/products.entity";

export interface IProductRepository extends AbstractPromise<ProductEntity>{
    findRelationById(id: number): Promise<ProductEntity>;
}