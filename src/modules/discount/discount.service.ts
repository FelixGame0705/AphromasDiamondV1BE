import { Inject, Injectable } from "@nestjs/common";
import { DiscountDTO } from "src/dto/discount.dto";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import { IDiscountRepository } from "src/interfaces/IDiscountRepository";
import { IProductRepository } from "src/interfaces/IProductRepository";
import { Discount } from "src/models/discount.model";

@Injectable()
export class DiscountService{
    constructor(
        @Inject('IDiscountRepository')
        private readonly discountRepository:IDiscountRepository,
        @Inject('IProductRepository')
        private readonly productRepository:IProductRepository,
        @Inject('IDiamondRepository')
        private readonly diamondRepository:IDiamondRepository
    ){

    }
    async findAll():Promise<Discount[]> {
        return (await this.discountRepository.findAll()).map(item => new Discount(item));
    }
    async findById(id:number):Promise<Discount>{
        return await this.discountRepository.findById(id);
    }
    async create(discount:DiscountDTO):Promise<Discount>{
        let discountCreate = await this.discountRepository.create(discount);
        let item = await this.discountRepository.findRelationById(discountCreate.DiscountID);
        for (let i = 0; i < discount.Products?.length || 0; i++) {
            await this.productRepository.update(discount.Products[i], { DiscountID: item.DiscountID })
        }
        for (let i = 0; i < discount.Diamonds?.length || 0; i++) {
            await this.diamondRepository.update(discount.Diamonds[i], { DiscountID: item.DiscountID })
        }
        return await this.discountRepository.create(discount);
    }
    async update(id: number, discount: DiscountDTO): Promise<Discount>{
        let discountUpdate = await this.discountRepository.update(id, discount);
        let item = await this.discountRepository.findRelationById(discountUpdate.DiscountID);
        for (let i = 0; i < discount.Products?.length || 0; i++) {
            await this.productRepository.update(discount.Products[i], { DiscountID: item.DiscountID })
        }
        for (let i = 0; i < discount.Diamonds?.length || 0; i++) {
            await this.diamondRepository.update(discount.Diamonds[i], { DiscountID: item.DiscountID })
        }
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
     
}