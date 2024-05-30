import { Inject, Injectable } from "@nestjs/common";
import { Diamond } from "src/models/diamond.model";
import { DiamondRepository } from "./diamond.repository";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
@Injectable()
export class DiamondService{
    constructor(
        @Inject('IDiamondRepository')
        private readonly diamondRepository:IDiamondRepository
    ){

    }
    async findAll():Promise<Diamond[]> {
        return (await this.diamondRepository.findAll()).map(item => new Diamond(item));
    }
    async findById(id:number):Promise<Diamond>{
        return await this.diamondRepository.findById(id);
    }
    async create(diamond:Diamond):Promise<Diamond>{
        return await this.diamondRepository.create(diamond);
    }
    async update(id: number, Diamond: Diamond): Promise<Diamond>{
        await this.diamondRepository.update(id, Diamond);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.diamondRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Diamond>{
        return await this.diamondRepository.findRelationById(id);
    }
}