import { AbstractPromise } from "./AbstractRepository";
import { Collection, CollectionAll } from "src/models/collection.model";

export interface ICollectionRepository extends AbstractPromise<Collection>{
    findRelationById(id: number): Promise<CollectionAll>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Collection[], total: number, page: number, last_page: number }>;

}