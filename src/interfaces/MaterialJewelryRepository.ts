import { MaterialJewelry } from "src/models/materialjewelry.model";
import { AbstractPromise } from "./AbstractRepository";

export interface MaterialJewelryRepository extends AbstractPromise<MaterialJewelry>{
    findRelationById(id: number): Promise<MaterialJewelry>;
}