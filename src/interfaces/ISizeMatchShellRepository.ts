import { SizeMatchShell } from "src/models/sizeMatchShell.model";
import { AbstractPromise } from "./AbstractRepository";

export interface ISizeMatchShellRepository extends AbstractPromise<SizeMatchShell>{
    findRelationById(id: number): Promise<SizeMatchShell>;
}