import { Certificate } from "src/models/certificate.model";
import { AbstractPromise } from "./AbstractRepository";

export interface ICertificateRepository extends AbstractPromise<Certificate>{
    findRelationById(id: number): Promise<Certificate>;
}