import { AbstractPromise } from "./AbstractRepository";
import { Collection } from "src/models/collection.model";

export interface ICollectionRepository extends AbstractPromise<Collection>{
    findRelationById(id: number): Promise<Collection>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Collection[], total: number, page: number, last_page: number }>;

}