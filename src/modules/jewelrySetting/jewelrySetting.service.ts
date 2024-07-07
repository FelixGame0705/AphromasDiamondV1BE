import { Inject, Injectable } from "@nestjs/common";
import { JewelrySetting as JewelrySettingDTO } from "src/dto/jewelrySetting.dto";
import { SizeDTO } from "src/dto/size.dto";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { IJewelrySettingRepository as IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { JewelrySetting } from "src/models/jewelrySetting.model";
import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";

@Injectable()
export class JewelrySettingService {
    constructor(
        @Inject('IJewelrySettingRepository')
        private readonly jewelrySettingRepository: IJewelrySettingRepository
    ) {

    }
    async findAll(): Promise<JewelrySetting[]> {
        const entities = await this.jewelrySettingRepository.findAll(); // Assuming this returns JewelrySettingEntity[]

        // Map each entity to JewelrySetting model or DTO
        const jewelrySettings = entities.map(entity => ({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            JewelrySettingVariant: entity.jewelrySettingVariant.map(
                item => {
                const modifiedJewelrySetting = {
                    ...item,
                    Price: item.materialJewelry.SellPrice * + entity.AuxiliaryCost + entity.ProductionCost
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
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            JewelrySettingVariant: entity.jewelrySettingVariant.map(
                item => {
                const modifiedJewelrySetting = {
                    ...item,
                    Price: item.materialJewelry.SellPrice * 1 + entity.AuxiliaryCost + entity.ProductionCost
                }
                return modifiedJewelrySetting
            }
            )
        })
    }
    async create(shell: JewelrySettingDTO): Promise<JewelrySetting> {
        let entity = await this.jewelrySettingRepository.create(shell);
        return new JewelrySetting({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            JewelrySettingVariant: entity.jewelrySettingVariant.map(
                item => {
                const modifiedJewelrySetting = {
                    ...item,
                    Price: item.materialJewelry.SellPrice * entity.AuxiliaryCost + entity.AuxiliaryCost + entity.ProductionCost
                }
                return modifiedJewelrySetting
            }
            )
        })
    }
    async update(id: number, shell: JewelrySettingDTO): Promise<JewelrySetting> {
        await this.jewelrySettingRepository.update(id, shell);
        return this.findById(id);
    }
    async delete(id: number): Promise<boolean> {
        return await this.jewelrySettingRepository.delete(id);
    }
    async findRelationById(id: number): Promise<JewelrySetting> {
        let entity = await this.jewelrySettingRepository.findRelationById(id);
        return new JewelrySetting({
            JewelrySettingID: entity.JewelrySettingID, // Replace with actual properties
            ProductionCost: entity.ProductionCost,
            IsActive: entity.IsActive,
            JewelrySettingVariant: entity.jewelrySettingVariant.map(
                item => {
                const modifiedJewelrySetting = {
                    ...item,
                    Price: item.materialJewelry.SellPrice * 1 + entity.AuxiliaryCost + entity.ProductionCost
                }
                return modifiedJewelrySetting
            }
            )
        })
    }
}