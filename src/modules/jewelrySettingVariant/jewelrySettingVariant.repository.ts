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

    async findById(id: number): Promise<JewelrySettingVariantEntity> {
        const builder = this.repository.createQueryBuilder('jewelrySettingVariant')
        .leftJoinAndSelect('jewelrySettingVariant.materialJewelry', 'materialJewelry')
        .leftJoinAndSelect('jewelrySettingVariant.size', 'size')
        .leftJoinAndSelect('jewelrySettingVariant.jewelrySettings', 'jewelrySetting')
        .select([
            'jewelrySettingVariant',
            'materialJewelry.SellPrice',
            'jewelrySetting',
            'size'
        ])
        .where('jewelrySettingVariant.JewelrySettingVariantID = :id', {id})
        .getOne();
        //const jewelrySettingVariantBuilder = this.repository.createQueryBuilder('jewelrySettingVariant').leftJoinAndSelect('jewelrySettingVariant.materialJewelry', 'materialJewelry');
        const data = await builder;
        
        return data;
    }

    async findAll(): Promise<JewelrySettingVariantEntity[]> {
        const builder = this.repository.createQueryBuilder('jewelrySettingVariant')
        .leftJoinAndSelect('jewelrySettingVariant.materialJewelry', 'materialJewelry')
        .leftJoinAndSelect('jewelrySettingVariant.size', 'size')
        .leftJoinAndSelect('jewelrySettingVariant.jewelrySettings', 'jewelrySetting')
        .select([
            'jewelrySettingVariant',
            'materialJewelry.SellPrice',
            'jewelrySetting',
            'size'
        ])
        .getMany();
        //const jewelrySettingVariantBuilder = this.repository.createQueryBuilder('jewelrySettingVariant').leftJoinAndSelect('jewelrySettingVariant.materialJewelry', 'materialJewelry');
        const data = await builder;
        
        return data;
    }

}