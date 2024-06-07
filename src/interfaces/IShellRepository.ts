import { AbstractPromise } from "./AbstractRepository";
import { Shell } from "src/models/shell.model";

export interface IShellRepository extends AbstractPromise<Shell>{
    findRelationById(id: number): Promise<Shell>;
}