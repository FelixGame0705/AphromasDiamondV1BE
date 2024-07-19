import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JewelrySettingEntity } from "src/entities/jewelrySetting.entity";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
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
    async findRelationVariantById(id: number): Promise<JewelrySettingEntity | null> {
        const builder = this.repository.createQueryBuilder('jewelrySetting')
        .leftJoinAndSelect('jewelrySetting.jewelrySettingVariant', 'jewelrySettingVariant')
        .leftJoinAndSelect('jewelrySettingVariant.materialJewelry', 'materialJewelry')
        .leftJoinAndSelect('jewelrySettingVariant.size', 'size')
        .select([
            'jewelrySetting',
            'jewelrySettingVariant',
            'materialJewelry.SellPrice',
            'size'
        ]).where('jewelrySetting.JewelrySettingID = :id', {id})
        .getOne();
        const data = await builder;
        if (!data) {
            console.error(`JewelrySettingEntity with id ${id} not found`);
            return null;
        }
        return data;
    }
    async findRelationById(id: number): Promise<JewelrySettingEntity> {
        return await this.repository.findOne({where: {[this.getIdField()]:id}, relations: ['product']})
    }

    protected getIdField(): keyof JewelrySettingEntity {
        return 'JewelrySettingID';
    }

    async findAll(): Promise<JewelrySettingEntity[]> {
        const rs = this.repository.find({relations: ['jewelrySettingVariant', 'jewelrySettingVariant.materialJewelry','jewelrySettingVariant.size', 'usingImage']})
        return rs;
    }

}