import { Size } from "src/models/size.model";
import { AbstractPromise } from "./AbstractRepository";

export interface ISizeRepository extends AbstractPromise<Size>{
    findRelationById(id: number): Promise<Size>;
}