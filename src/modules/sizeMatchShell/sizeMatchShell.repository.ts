import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SizeMatchShellEntity } from "src/entities/sizeMatchShell.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { ISizeMatchShellRepository } from "src/interfaces/ISizeMatchShellRepository";
import { SizeMatchShell } from "src/models/sizeMatchShell.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class SizeMatchShellRepository extends BaseRepository<SizeMatchShellEntity, Repository<SizeMatchShellEntity>> implements ISizeMatchShellRepository{
    constructor(
        @InjectRepository(SizeMatchShellEntity)
        protected readonly repository: Repository<SizeMatchShellEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<SizeMatchShell> {
        return null;
    }

    protected getIdField(): keyof SizeMatchShell {
        return 'SizeMatchShellID';
    }

    async findAll(): Promise<SizeMatchShellEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<SizeMatchShellEntity>});
    }

}