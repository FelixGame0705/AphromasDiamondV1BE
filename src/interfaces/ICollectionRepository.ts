import { AbstractPromise } from "./AbstractRepository";
import { Collection } from "src/models/collection.model";

export interface ICollectionRepository extends AbstractPromise<Collection>{
    //findRelationById(id: number): Promise<Certificate>;
}