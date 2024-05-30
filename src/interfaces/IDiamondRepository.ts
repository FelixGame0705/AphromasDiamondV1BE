import { Diamond } from "src/models/diamond.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IDiamondRepository extends AbstractPromise<Diamond>{
    findRelationById(id: number): Promise<Diamond>;
}