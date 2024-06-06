import { Diamond } from "src/models/diamond.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IDiamondRepository extends AbstractPromise<Diamond>{
    findRelationById(id: number): Promise<Diamond>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Diamond[], total: number, page: number, last_page: number }>;
}