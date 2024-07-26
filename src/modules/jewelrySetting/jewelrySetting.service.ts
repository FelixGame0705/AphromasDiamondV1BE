import { Inject, Injectable } from "@nestjs/common";
import { JewelrySettingDTO } from "src/dto/jewelrySetting.dto";
import { SizeDTO } from "src/dto/size.dto";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { IJewelrySettingRepository as IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { JewelrySetting, JewelrySettingAll } from "src/models/jewelrySetting.model";
import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";
import { UsingImage } from "src/models/usingImage.model";

@Injectable()
export class JewelrySettingService {
    constructor(
        @Inject('IJewelrySettingRepository')
        private readonly jewelrySettingRepository: IJewelrySettingRepository
    ) {

    }
    async findAll(): Promise<JewelrySettingAll[]> {
        const entities = await this.jewelrySettingRepository.findAll(); // Assuming this returns JewelrySettingEntity[]

        // Map each entity to JewelrySetting model or DTO
        const jewelrySettings = entities.map(entity => (
            {
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            Name: entity.Name,
            // ProductID: entity.ProductID,
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            UsingImage: entity.usingImage,
            JewelrySettingVariant: entity.jewelrySettingVariant.map(
                item => {
                    const sellPrice = item.materialJewelry?.SellPrice ?? 0;//
                    const modifiedJewelrySetting = {
                        JewelrySettingVariantID: item.JewelrySettingVariantID,
                        Quantity: item.SizeID,
                        //TotalPriceVariant: (sellPrice * item.Weight + entity.ProductionCost) * entity.ChargeRate,
                        // Size: item.size,
                        MaterialJewelry: item.materialJewelry
                        
                    }
                    return modifiedJewelrySetting
                }
            )
            // Map other properties accordingly
        }));

        return jewelrySettings;
    }
    async findById(id: number): Promise<JewelrySetting> {
        let entity = await this.jewelrySettingRepository.findRelationVariantById(id);
        return new JewelrySetting({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            Name: entity.Name,
            ProductionCost: Number(entity.ProductionCost),
            IsActive: entity.IsActive,
            JewelrySettingVariant: Array.isArray(entity.jewelrySettingVariant) ? entity.jewelrySettingVariant.map(
                item => {
                    const modifiedJewelrySetting = {
                        ...item,
                    }
                    return modifiedJewelrySetting
                }
            ):[]
        })
    }
    async create(shell: JewelrySettingDTO): Promise<JewelrySetting> {
        let entity = await this.jewelrySettingRepository.create(shell);
        return new JewelrySetting({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            Name: entity.Name,
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            JewelrySettingVariant: Array.isArray(entity.jewelrySettingVariant) ? entity.jewelrySettingVariant.map(
                item => {
                    const modifiedJewelrySetting = {
                        ...item,
                        //TotalPriceVariant: (item.materialJewelry.SellPrice * item.Weight + entity.ProductionCost) * entity.ChargeRate
                    }
                    return modifiedJewelrySetting
                }
            ):[]
        })
    }
    async update(id: number, shell: JewelrySettingDTO): Promise<JewelrySetting> {
        await this.jewelrySettingRepository.update(id, shell);
        return this.findById(id);
    }
    async delete(id: number): Promise<boolean> {
        return await this.jewelrySettingRepository.delete(id);
    }
    async findRelationById(id: number): Promise<JewelrySettingAll> {
        let entity = await this.jewelrySettingRepository.findRelationById(id);
        return new JewelrySettingAll({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            Name: entity.Name,
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            UsingImage: entity.usingImage,
            JewelrySettingVariant: Array.isArray(entity.jewelrySettingVariant) ? entity.jewelrySettingVariant.map(
                item => {
                    const modifiedJewelrySetting = {
                        ...item,
                        TotalPriceVariant: (item.materialJewelry.SellPrice * item.Weight + entity.ProductionCost) * entity.ChargeRate
                    }
                    return modifiedJewelrySetting
                }
            ):[]
        })
    }
}