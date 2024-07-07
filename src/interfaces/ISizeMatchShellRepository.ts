import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";
import { AbstractPromise } from "./AbstractRepository";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";

export interface IJewelrySettingVariantRepository extends AbstractPromise<JewelrySettingVariantEntity>{
    findRelationById(id: number): Promise<JewelrySettingVariant>;
}