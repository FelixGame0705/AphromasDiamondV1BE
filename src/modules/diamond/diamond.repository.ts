import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiamondEntity } from "src/entities/diamond.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import { Diamond } from "src/models/diamond.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class DiamondRepository extends BaseRepository<DiamondEntity, Repository<DiamondEntity>> implements IDiamondRepository{
    constructor(
        @InjectRepository(DiamondEntity)
        protected readonly repository: Repository<DiamondEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Diamond> {
        return null;
    }

    protected getIdField(): keyof Diamond {
        return 'DiamondID';
    }

    async findAll(): Promise<DiamondEntity[]> {
        return await this.repository.find({where: { IsActive: true } as FindOptionsWhere<DiamondEntity>});
    }

}