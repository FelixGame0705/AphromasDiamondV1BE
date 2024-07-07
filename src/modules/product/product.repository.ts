import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/products.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IProductRepository } from "src/interfaces/IProductRepository";
import { Product } from "src/models/product.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity, Repository<ProductEntity>> implements IProductRepository{
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly repository: Repository<ProductEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Product> {
        return null;
    }

    protected getIdField(): keyof ProductEntity {
        return 'ProductID';
    }

    async findAll(): Promise<ProductEntity[]> {
        let data = await this.repository.find();
        return data;
    }

}