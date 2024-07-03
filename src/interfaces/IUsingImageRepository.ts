import { UsingImage } from "src/models/usingImage.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IUsingImageRepository extends AbstractPromise<UsingImage>{
    findRelationById(id: number): Promise<UsingImage>;
}