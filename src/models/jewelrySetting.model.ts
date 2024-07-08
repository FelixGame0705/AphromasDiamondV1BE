import { JewelrySettingVariant, JewelrySettingVariantAll } from "./jewelrySettingVariant.model"

export class JewelrySetting {
    JewelrySettingID: number

    ProductionCost: number
    IsActive: boolean

    JewelrySettingVariant: JewelrySettingVariant[]

    constructor({ JewelrySettingID, ProductionCost, IsActive, JewelrySettingVariant }) {
        if (JewelrySetting != undefined) this.JewelrySettingID = JewelrySettingID;
        if (ProductionCost != undefined) this.ProductionCost = ProductionCost;
        if (IsActive != undefined) this.IsActive = IsActive;
        if (JewelrySettingVariant != undefined) this.JewelrySettingVariant = JewelrySettingVariant;
    }
}

export class JewelrySettingAll {
    JewelrySettingID: number
    ProductionCost: number
    IsActive: boolean

    JewelrySettingVariant: JewelrySettingVariantAll[]

    constructor({ JewelrySettingID, ProductionCost, IsActive, JewelrySettingVariant }) {
        if (JewelrySetting != undefined) this.JewelrySettingID = JewelrySettingID;
        if (ProductionCost != undefined) this.ProductionCost = ProductionCost;
        if (IsActive != undefined) this.IsActive = IsActive;
        if (JewelrySettingVariant != undefined) this.JewelrySettingVariant = JewelrySettingVariant;
    }
}
