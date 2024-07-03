import { JewelryType } from "src/models/jewelryType.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IJewelryTypeRepository extends AbstractPromise<JewelryType>{
    findRelationById(id: number): Promise<JewelryType>;
}