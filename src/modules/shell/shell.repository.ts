import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShellEntity } from "src/entities/shell.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IShellRepository } from "src/interfaces/IShellRepository";
import { Shell } from "src/models/shell.model";
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
        return await this.repository.find({where: { IsActive: true } as FindOptionsWhere<ShellEntity>});
    }

}
