import { Inject, Injectable } from "@nestjs/common";
import { JewelrySettingVariantDTO } from "src/dto/jewelrySettingVariant.dto";

import { IJewelrySettingVariantRepository } from "src/interfaces/ISizeMatchShellRepository"
import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";

@Injectable()
export class JewelrySettingVariantService {
    constructor(
        @Inject('IJewelrySettingVariantRepository')
        private readonly jewelrySettingVariantRepository: IJewelrySettingVariantRepository
    ) {

    }
    async findAll(): Promise<JewelrySettingVariant[]> {
        let data = (await this.jewelrySettingVariantRepository.findAll()).map(item => {
            const sellPrice = item.materialJewelry?.SellPrice ?? 0;
            const productionCost = item.jewelrySettings?.ProductionCost ?? 0;
            const auxiliaryCost = item.jewelrySettings?.AuxiliaryCost ?? 0;
            return new JewelrySettingVariant(
                {
                    JewelrySettingVariantID: item.JewelrySettingVariantID,
                    JewelrySettingID: item.JewelrySettingID,
                    TotalPriceVariant: item.Weight * sellPrice + productionCost + auxiliaryCost,
                    MaterialJewelry: item.materialJewelry,
                    Size: item.size,
                    SizeID: item.SizeID

                });
        });
        return data;
    }
    async findById(id: number): Promise<JewelrySettingVariant> {
        let item = await this.jewelrySettingVariantRepository.findById(id);
        const sellPrice = item.materialJewelry?.SellPrice ?? 0;
        const productionCost = item.jewelrySettings?.ProductionCost ?? 0;
        const auxiliaryCost = item.jewelrySettings?.AuxiliaryCost ?? 0;
        return new JewelrySettingVariant({
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            JewelrySettingID: item.JewelrySettingID,
            TotalPriceVariant: item.Weight * sellPrice + productionCost + auxiliaryCost,
            MaterialJewelry: item.materialJewelry,
            Size: item.size,
            SizeID: item.SizeID
        })
    }
    async create(sizeMatchShell: JewelrySettingVariantDTO): Promise<JewelrySettingVariant> {
        let item = await this.jewelrySettingVariantRepository.create(sizeMatchShell);
        const sellPrice = item.materialJewelry?.SellPrice ?? 0;
        console.log(sellPrice)
        const productionCost = item.jewelrySettings?.ProductionCost ?? 0;
        const auxiliaryCost = item.jewelrySettings?.AuxiliaryCost ?? 0;
        return new JewelrySettingVariant({
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            JewelrySettingID: item.JewelrySettingID,
            TotalPriceVariant: item.Weight * sellPrice + productionCost + auxiliaryCost,
            MaterialJewelry: item.materialJewelry,
            Size: item.size,
            SizeID: item.SizeID
        })
    }
    async update(id: number, sizeMatchShell: JewelrySettingVariantDTO): Promise<JewelrySettingVariant> {
        await this.jewelrySettingVariantRepository.update(id, sizeMatchShell);
        return this.findById(id);
    }
    async delete(id: number): Promise<boolean> {
        return await this.jewelrySettingVariantRepository.delete(id);
    }
    async findRelationById(id: number): Promise<JewelrySettingVariant> {
        return await this.jewelrySettingVariantRepository.findRelationById(id);
    }
}