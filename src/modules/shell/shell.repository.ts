import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShellEntity } from "../../entities/shell.entity";
import { BaseRepository } from "../../interfaces/BaseRepository";
import { IShellRepository } from "../../interfaces/IShellRepository";
import { Shell } from "../../models/shell.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ShellRepository extends BaseRepository<ShellEntity, Repository<ShellEntity>> implements IShellRepository{
    constructor(
        @InjectRepository(ShellEntity)
        protected readonly repository: Repository<ShellEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Shell> {
        return null;
    }

    protected getIdField(): keyof Shell {
        return 'ShellID';
    }

    async findAll(): Promise<ShellEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<ShellEntity>});
    }

}