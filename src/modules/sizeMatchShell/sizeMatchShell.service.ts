import { Inject, Injectable } from "@nestjs/common";
import { SizeMatchShellDTO } from "../../dto/sizeMatchShell.dto";
import { ISizeMatchShellRepository } from "../../interfaces/ISizeMatchShellRepository"
import { SizeMatchShell } from "../../models/sizeMatchShell.model";

@Injectable()
export class SizeMatchShellService{
    constructor(
        @Inject('ISizeMatchShellRepository')
        private readonly sizeMatchShellRepository:ISizeMatchShellRepository
    ){

    }
    async findAll():Promise<SizeMatchShell[]> {
        return (await this.sizeMatchShellRepository.findAll()).map(item => new SizeMatchShell(item));
    }
    async findById(id:number):Promise<SizeMatchShell>{
        return await this.sizeMatchShellRepository.findById(id);
    }
    async create(sizeMatchShell:SizeMatchShellDTO):Promise<SizeMatchShell>{
        return await this.sizeMatchShellRepository.create(sizeMatchShell);
    }
    async update(id: number, sizeMatchShell: SizeMatchShellDTO): Promise<SizeMatchShell>{
        await this.sizeMatchShellRepository.update(id, sizeMatchShell);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.sizeMatchShellRepository.delete(id);
    }
    async findRelationById(id: number):Promise<SizeMatchShell>{
        return await this.sizeMatchShellRepository.findRelationById(id);
    }
}