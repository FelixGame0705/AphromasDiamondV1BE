import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { FindOptionsWhere, Repository } from "typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/models/product.model";
import { IProductRepository } from "src/interfaces/IProductRepository";

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity, Repository<ProductEntity>> implements IProductRepository{
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly repository: Repository<ProductEntity>
    ){
        super(repository);
    }
    findRelationProducById(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    paginateAndFilter(page: number, perPage: number, filters: any, sort: { field: string; Product: "ASC" | "DESC"; }): Promise<{ data: Product[]; total: number; page: number; last_page: number; }> {
        throw new Error("Method not implemented.");
    }
    findRelationById(id: number): Promise<Product> {
        return null;
    }

    protected getIdField(): keyof Product {
        return 'ProductID';
    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<ProductEntity>});
    }

}