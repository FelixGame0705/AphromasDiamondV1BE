import { AbstractPromise } from "./AbstractRepository";
import { JewelrySetting } from "src/models/jewelrySetting.model";

export interface IJewelrySettingRepository extends AbstractPromise<JewelrySetting>{
    findRelationById(id: number): Promise<JewelrySetting>;
}