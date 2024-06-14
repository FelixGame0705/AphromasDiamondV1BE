import { Inject, Injectable } from "@nestjs/common";
import { ShellDTO } from "src/dto/shell.dto";
import { SizeDTO } from "src/dto/size.dto";
import { SizeMatchShellDTO } from "src/dto/sizeMatchShell.dto";
import { IShellRepository } from "src/interfaces/IShellRepository";
import { Shell } from "src/models/shell.model";

@Injectable()
export class ShellService{
    constructor(
        @Inject('IShellRepository')
        private readonly shellRepository:IShellRepository
    ){

    }
    async findAll():Promise<Shell[]> {
        return (await this.shellRepository.findAll()).map(item => new Shell(item));
    }
    async findById(id:number):Promise<Shell>{
        return await this.shellRepository.findById(id);
    }
    async create(shell:ShellDTO):Promise<Shell>{
        return await this.shellRepository.create(shell);
    }
    async update(id: number, shell: ShellDTO): Promise<Shell>{
        await this.shellRepository.update(id, shell);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.shellRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Shell>{
        return await this.shellRepository.findRelationById(id);
    }
}