import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SizeEntity } from "src/entities/size.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { ISizeRepository } from "src/interfaces/ISizeRepository";
import { Size } from "src/models/size.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class SizeRepository extends BaseRepository<SizeEntity, Repository<SizeEntity>> implements ISizeRepository{
    constructor(
        @InjectRepository(SizeEntity)
        protected readonly repository: Repository<SizeEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Size> {
        return null;
    }

    protected getIdField(): keyof Size {
        return 'SizeID';
    }

    async findAll(): Promise<SizeEntity[]> {
        return await this.repository.find();
    }

}