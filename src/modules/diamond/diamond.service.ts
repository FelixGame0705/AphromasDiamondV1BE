import { Inject, Injectable } from "@nestjs/common";
import { Diamond } from "src/models/diamond.model";
import { DiamondRepository } from "./diamond.repository";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import { PRODUCT_PER_PAGE } from "src/constants/constant";
import { DiamondDTO } from "src/dto/diamond.dto";
@Injectable()
export class DiamondService{
    constructor(
        @Inject('IDiamondRepository')
        private readonly diamondRepository:IDiamondRepository
    ){

    }
    async findAll():Promise<Diamond[]> {
        let rs = await this.diamondRepository.findAll();
        return rs;
    }
    async findById(id:number):Promise<Diamond>{
        return await this.diamondRepository.findById(id);
    }
    async create(diamond:DiamondDTO):Promise<Diamond>{
        return await this.diamondRepository.create(diamond);
    }
    async update(id: number, Diamond: DiamondDTO): Promise<Diamond>{
        await this.diamondRepository.update(id, Diamond);
        return this.findRelationById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.diamondRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Diamond>{
        return await this.diamondRepository.findRelationById(id);
    }
    async getDiamonds(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.diamondRepository.paginateAndFilter(page, perPage, filters, sort);
    }

    async updateDiamondStatusAfterPurchase(diamondId: number): Promise<void> {
        await this.diamondRepository.update(diamondId, { IsActive: false });
    }

}