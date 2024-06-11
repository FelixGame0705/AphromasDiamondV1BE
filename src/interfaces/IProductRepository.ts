import { AbstractPromise } from "./AbstractRepository";
import { Product } from "src/models/product.model";

 export interface IProductRepository extends AbstractPromise<Product>{
    findRelationProducById(id: number): Promise<Product>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, Product: 'ASC' | 'DESC' }
    ): Promise<{ data: Product[], total: number, page: number, last_page: number }>;
}