import { Voucher } from "src/models/voucher.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IVoucherRepository extends AbstractPromise<Voucher>{
    findRelationById(id: number): Promise<Voucher>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Voucher[], total: number, page: number, last_page: number }>;

}