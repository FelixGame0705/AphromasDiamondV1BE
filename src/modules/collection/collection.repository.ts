import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CollectionEntity } from "src/entities/collection.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { Collection } from "src/models/collection.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CollectionRepository extends BaseRepository<CollectionEntity, Repository<CollectionEntity>> implements CollectionRepository{
    constructor(
        @InjectRepository(CollectionEntity)
        protected readonly repository: Repository<CollectionEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Collection> {
        return null;
    }

    protected getIdField(): keyof Collection {
        return 'CollectionID';
    }

    async findAll(): Promise<CollectionEntity[]> {
        return await this.repository.find();
    }

}