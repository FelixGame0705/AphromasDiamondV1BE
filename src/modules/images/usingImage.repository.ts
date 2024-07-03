import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsingImageEntity } from "src/entities/usingImage.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IUsingImageRepository } from "src/interfaces/IUsingImageRepository";
import { UsingImage } from "src/models/usingImage.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UsingImageRepository extends BaseRepository<UsingImageEntity, Repository<UsingImageEntity>> implements IUsingImageRepository{
    constructor(
        @InjectRepository(UsingImageEntity)
        protected readonly repository: Repository<UsingImageEntity>
    ){
        super(repository);
    }

    findRelationById(id: number): Promise<UsingImage> {
        return null;
    }

    protected getIdField(): keyof UsingImage {
        return 'UsingImageID';
    }

    async findAll(): Promise<UsingImageEntity[]> {
        return await this.repository.find();
    }

}