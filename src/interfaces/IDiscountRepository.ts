import { Discount } from "src/models/discount.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IDiscountRepository extends AbstractPromise<Discount>{
    findRelationById(id: number): Promise<Discount>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Discount[], total: number, page: number, last_page: number }>;

}