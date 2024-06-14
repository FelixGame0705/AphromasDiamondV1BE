import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialJewelryEntity } from "../../entities/marterialJewelry.entity";
import { BaseRepository } from "../../interfaces/BaseRepository";
import { MaterialJewelry } from "../../models/materialjewelry.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class MaterialJewelryRepository extends BaseRepository<MaterialJewelryEntity, Repository<MaterialJewelryEntity>> implements MaterialJewelryRepository{
    constructor(
        @InjectRepository(MaterialJewelryEntity)
        protected readonly repository: Repository<MaterialJewelryEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<MaterialJewelry> {
        return null;
    }

    protected getIdField(): keyof MaterialJewelry {
        return 'MaterialID';
    }

    async findAll(): Promise<MaterialJewelryEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<MaterialJewelryEntity>});
    }

}