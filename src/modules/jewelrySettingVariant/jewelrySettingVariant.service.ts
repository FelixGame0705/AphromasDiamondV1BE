import { Inject, Injectable } from "@nestjs/common";
import { JewelrySettingVariantDTO } from "src/dto/jewelrySettingVariant.dto";

import { IJewelrySettingVariantRepository } from "src/interfaces/ISizeMatchShellRepository"
import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";

@Injectable()
export class JewelrySettingVariantService{
    constructor(
        @Inject('IJewelrySettingVariantRepository')
        private readonly jewelrySettingVariantRepository:IJewelrySettingVariantRepository
    ){

    }
    async findAll():Promise<JewelrySettingVariant[]> {
        return (await this.jewelrySettingVariantRepository.findAll()).map(item => new JewelrySettingVariant(item));
    }
    async findById(id:number):Promise<JewelrySettingVariant>{
        return await this.jewelrySettingVariantRepository.findById(id);
    }
    async create(sizeMatchShell:JewelrySettingVariantDTO):Promise<JewelrySettingVariant>{
        return await this.jewelrySettingVariantRepository.create(sizeMatchShell);
    }
    async update(id: number, sizeMatchShell: JewelrySettingVariantDTO): Promise<JewelrySettingVariant>{
        await this.jewelrySettingVariantRepository.update(id, sizeMatchShell);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.jewelrySettingVariantRepository.delete(id);
    }
    async findRelationById(id: number):Promise<JewelrySettingVariant>{
        return await this.jewelrySettingVariantRepository.findRelationById(id);
    }
}