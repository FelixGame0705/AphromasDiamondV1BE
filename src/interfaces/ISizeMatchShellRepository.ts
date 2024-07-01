import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IJewelrySettingVariantRepository extends AbstractPromise<JewelrySettingVariant>{
    findRelationById(id: number): Promise<JewelrySettingVariant>;
}