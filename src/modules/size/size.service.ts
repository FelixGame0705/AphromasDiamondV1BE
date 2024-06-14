import { Inject, Injectable } from "@nestjs/common";
import { SizeDTO } from "src/dto/size.dto";
import { ISizeRepository } from "src/interfaces/ISizeRepository"
import { Size } from "src/models/size.model";

@Injectable()
export class SizeService{
    constructor(
        @Inject('ISizeRepository')
        private readonly sizeRepository:ISizeRepository
    ){

    }
    async findAll():Promise<Size[]> {
        return (await this.sizeRepository.findAll()).map(item => new Size(item));
    }
    async findById(id:number):Promise<Size>{
        return await this.sizeRepository.findById(id);
    }
    async create(size:SizeDTO):Promise<Size>{
        return await this.sizeRepository.create(size);
    }
    async update(id: number, size: SizeDTO): Promise<Size>{
        await this.sizeRepository.update(id, size);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.sizeRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Size>{
        return await this.sizeRepository.findRelationById(id);
    }
}