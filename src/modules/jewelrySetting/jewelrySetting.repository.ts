import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { JewelrySetting } from "src/models/jewelrySetting.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class JewelrySettingRepository extends BaseRepository<JewelrySettingEntity, Repository<JewelrySettingEntity>> implements IJewelrySettingRepository{
    constructor(
        @InjectRepository(JewelrySettingEntity)
        protected readonly repository: Repository<JewelrySettingEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<JewelrySetting> {
        return null;
    }

    protected getIdField(): keyof JewelrySettingEntity {
        return 'JewelrySettingID';
    }

    async findAll(): Promise<JewelrySettingEntity[]> {
        let data = await this.repository.find();
        return data;
    }

}