import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_PER_PAGE } from "src/constants/constant";
import { IDiscountRepository } from "src/interfaces/IDiscountRepository";
import { Discount } from "src/models/discount.model";

@Injectable()
export class DiscountService{
    constructor(
        @Inject('IDiscountRepository')
        private readonly discountRepository:IDiscountRepository
    ){

    }
    async findAll():Promise<Discount[]> {
        return (await this.discountRepository.findAll()).map(item => new Discount(item));
    }
    async findById(id:number):Promise<Discount>{
        return await this.discountRepository.findById(id);
    }
    async create(discount:Discount):Promise<Discount>{
        return await this.discountRepository.create(discount);
    }
    async update(id: number, discount: Discount): Promise<Discount>{
        await this.discountRepository.update(id, discount);
        return this.findById(id);
    }
    async delete(id: number): Promise<Discount> {
        const discount = await this.discountRepository.findById(id);
        if (!discount) {
            throw new Error('Discount not found');
        }
            await this.discountRepository.delete(id);
            return discount;
      }
    async findRelationById(id: number):Promise<Discount>{
        return await this.discountRepository.findRelationById(id);
    }
    async getDiamonds(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.discountRepository.paginateAndFilter(page, perPage, filters, sort);
    }
}