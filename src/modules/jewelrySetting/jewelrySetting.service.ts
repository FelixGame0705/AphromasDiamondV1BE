import { Inject, Injectable } from "@nestjs/common";
import { ShellDTO as JewelrySettingDTO } from "src/dto/shell.dto";
import { SizeDTO } from "src/dto/size.dto";
import { IJewelrySettingRepository as IJewelrySettingRepository } from "src/interfaces/IShellRepository";
import { JewelrySetting } from "src/models/jewelrySetting.model";

@Injectable()
export class JewelrySettingService{
    constructor(
        @Inject('IJewelrySettingRepository')
        private readonly jewelrySettingRepository:IJewelrySettingRepository
    ){

    }
    async findAll():Promise<JewelrySetting[]> {
        return (await this.jewelrySettingRepository.findAll()).map(item => new JewelrySetting(item));
    }
    async findById(id:number):Promise<JewelrySetting>{
        return await this.jewelrySettingRepository.findById(id);
    }
    async create(shell:JewelrySettingDTO):Promise<JewelrySetting>{
        return await this.jewelrySettingRepository.create(shell);
    }
    async update(id: number, shell: JewelrySettingDTO): Promise<JewelrySetting>{
        await this.jewelrySettingRepository.update(id, shell);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.jewelrySettingRepository.delete(id);
    }
    async findRelationById(id: number):Promise<JewelrySetting>{
        return await this.jewelrySettingRepository.findRelationById(id);
    }
}