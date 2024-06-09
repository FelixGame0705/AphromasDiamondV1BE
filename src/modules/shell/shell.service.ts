import { Inject, Injectable } from "@nestjs/common";
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
        return (await this.shellRepository.findAll()).map(item => new  Shell(item));
    }
    async findById(id:number):Promise<Shell>{
        return await this.shellRepository.findById(id);
    }
    async create(shell:Shell):Promise<Shell>{
        return await this.shellRepository.create(shell);
    }
    async update(id: number, shell: Shell): Promise<Shell>{
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