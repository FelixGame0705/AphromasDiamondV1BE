import { Product } from "src/models/product.model";
import { AbstractPromise } from "./AbstractRepository";
import { ProductEntity } from "src/entities/products.entity";

export interface IProductRepository extends AbstractPromise<ProductEntity>{
    findRelationById(id: number): Promise<ProductEntity>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: ProductEntity[], total: number, page: number, last_page: number }>;
}