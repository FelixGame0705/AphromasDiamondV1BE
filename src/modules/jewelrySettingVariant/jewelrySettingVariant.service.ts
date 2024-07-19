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
            return new JewelrySettingVariant(
                {
                    JewelrySettingVariantID: item.JewelrySettingVariantID,
                    JewelrySettingID: item.JewelrySettingID,
                    TotalPriceVariant: item.Price,
                    MaterialJewelry: item.materialJewelry,
                    Size: item.size,
                    SizeID: item.SizeID

                });
        });
        return data;
    }
    async findById(id: number): Promise<JewelrySettingVariant> {
        let item = await this.jewelrySettingVariantRepository.findById(id);
        return new JewelrySettingVariant({
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            JewelrySettingID: item.JewelrySettingID,
            TotalPriceVariant: item.Price,
            MaterialJewelry: item.materialJewelry,
            Size: item.size,
            SizeID: item.SizeID
        })
    }
    async create(sizeMatchShell: JewelrySettingVariantDTO): Promise<JewelrySettingVariant> {
        const variant = await this.jewelrySettingVariantRepository.create(sizeMatchShell);
        const item = await this.jewelrySettingVariantRepository.findById(variant.JewelrySettingVariantID)
        console.log("Value: ", item)
        return new JewelrySettingVariant({
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            JewelrySettingID: item.JewelrySettingID,
            TotalPriceVariant: item.Price,
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