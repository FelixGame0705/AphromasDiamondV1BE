import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IJewelrySettingVariantRepository } from "src/interfaces/ISizeMatchShellRepository";
import { JewelrySettingVariant } from "src/models/jewelrySettingVariant.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class JewelrySettingVariantRepository extends BaseRepository<JewelrySettingVariantEntity, Repository<JewelrySettingVariantEntity>> implements IJewelrySettingVariantRepository{
    constructor(
        @InjectRepository(JewelrySettingVariantEntity)
        protected readonly repository: Repository<JewelrySettingVariantEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<JewelrySettingVariant> {
        return null;
    }

    protected getIdField(): keyof JewelrySettingVariantEntity {
        return 'JewelrySettingVariantID';
    }

    async findAll(): Promise<JewelrySettingVariantEntity[]> {
        return await this.repository.find();
    }

}