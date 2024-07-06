import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { AbstractPromise } from "./AbstractRepository";
import { JewelrySetting } from "src/models/jewelrySetting.model";

export interface IJewelrySettingRepository extends AbstractPromise<JewelrySettingEntity>{
    findRelationById(id: number): Promise<JewelrySetting>;
}