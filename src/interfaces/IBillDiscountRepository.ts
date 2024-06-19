import { BillDiscount } from "src/models/billdiscount.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IBillDiscountRepository extends AbstractPromise<BillDiscount>{
    findRelationById(id: number): Promise<BillDiscount>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: BillDiscount[], total: number, page: number, last_page: number }>;

}