import { JewelrySettingVariant, JewelrySettingVariantAll } from "./jewelrySettingVariant.model"
import { NestFactory } from '@nestjs/core';
import { UsingImage } from "./usingImage.model";

export class JewelrySetting {
    JewelrySettingID: number
    Name: string
    ProductionCost: number
    IsActive: boolean

    JewelrySettingVariant: JewelrySettingVariant[]

    constructor({ JewelrySettingID, Name, ProductionCost, IsActive, JewelrySettingVariant }) {
        if (JewelrySetting != undefined) this.JewelrySettingID = JewelrySettingID;
        if (Name != undefined) this.Name = Name;    
        if (ProductionCost != undefined) this.ProductionCost = ProductionCost;
        if (IsActive != undefined) this.IsActive = IsActive;
        if (JewelrySettingVariant != undefined) this.JewelrySettingVariant = JewelrySettingVariant;
    }
}

export class JewelrySettingAll {
    JewelrySettingID: number
    Name: string
    ProductionCost: number
    IsActive: boolean

    JewelrySettingVariant: JewelrySettingVariantAll[]
    UsingImage: UsingImage[]

    constructor({ JewelrySettingID, Name, ProductionCost, IsActive, JewelrySettingVariant, UsingImage }) {
        if (JewelrySetting != undefined) this.JewelrySettingID = JewelrySettingID;
        if (Name != undefined) this.Name = Name;
        if (ProductionCost != undefined) this.ProductionCost = ProductionCost;
        if (IsActive != undefined) this.IsActive = IsActive;
        if (JewelrySettingVariant != undefined) this.JewelrySettingVariant = JewelrySettingVariant;
        if (UsingImage != undefined) this.UsingImage = UsingImage;
    }
}
