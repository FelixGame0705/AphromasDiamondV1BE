import { Inject, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
import { IProductRepository } from "src/interfaces/IProductRepository"
import { Product } from "src/models/product.model";

@Injectable()
export class ProductService{
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository:IProductRepository
    ){

    }
    async findAll():Promise<Product[]> {
        let data = (await this.productRepository.findAll()).map(item => new Product(item));
        return data
    }
    async findById(id:number):Promise<Product>{
        return await this.productRepository.findById(id);
    }
    async create(product:ProductDTO):Promise<Product>{
        return await this.productRepository.create(product);
    }
    async update(id: number, product: ProductDTO): Promise<Product>{
        await this.productRepository.update(id, product);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.productRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Product>{
        return await this.productRepository.findRelationById(id);
    }
}