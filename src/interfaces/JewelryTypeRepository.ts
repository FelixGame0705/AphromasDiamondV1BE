import { JewelryType } from "src/models/JewelryType.model";
import { AbstractPromise } from "./AbstractRepository";

export interface JewelryTypeRepository extends AbstractPromise<JewelryType>{
    findRelationById(id: number): Promise<JewelryType>;
}