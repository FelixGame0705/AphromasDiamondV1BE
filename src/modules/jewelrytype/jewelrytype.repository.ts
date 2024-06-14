import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JewelryTypeEntity } from "src/entities/jewelryType.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { JewelryType } from "src/models/jewelrytype.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class JewelryTypeRepository extends BaseRepository<JewelryTypeEntity, Repository<JewelryTypeEntity>> implements JewelryTypeRepository{
    constructor(
        @InjectRepository(JewelryTypeEntity)
        protected readonly repository: Repository<JewelryTypeEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<JewelryType> {
        return null;
    }

    protected getIdField(): keyof JewelryType {
        return 'JewelryTypeID';
    }

    async findAll(): Promise<JewelryTypeEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<JewelryTypeEntity>});
    }

}