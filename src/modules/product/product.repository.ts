import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/products.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IProductRepository } from "src/interfaces/IProductRepository";
import { Product } from "src/models/product.model";
import { FindOptionsWhere, Repository } from "typeorm";
import { DiamondRepository } from "../diamond/diamond.repository";
import { DiamondEntity } from "src/entities/diamond.entity";

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity, Repository<ProductEntity>> implements IProductRepository{
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly repository: Repository<ProductEntity>
    ){
        super(repository);
    }
    async findRelationById(id: number): Promise<ProductEntity> {

        const rs = await this.repository.findOne({where: {[this.getIdField()]:id}, relations:['diamonds','usingImage','jewelrySetting','jewelrySetting.jewelrySettingVariant','jewelrySetting.jewelryType', 'diamonds.certificate', 'discount']})
        return rs;
        //return await this.repository.findOne({where: {[this.getIdField()]:id}, relations: ['diamonds']})
    }

    protected getIdField(): keyof ProductEntity {
        return 'ProductID';
    }

    async findAll(): Promise<ProductEntity[]> {
        const builder = this.repository.createQueryBuilder('product')
        .leftJoinAndSelect('product.diamonds', 'diamonds')
        .leftJoinAndSelect('product.discount', 'discount')
        .leftJoinAndSelect('product.usingImage','usingImage')
        .leftJoinAndSelect('product.jewelrySetting', 'jewelrySetting')
        .leftJoinAndSelect('jewelrySetting.jewelrySettingVariant','JewelrySettingVariant')
        .leftJoinAndSelect('jewelrySetting.jewelryType', 'jewelryType')
        const data = await builder.getMany();
        
        return data;
    }

    // async findById(id: number): Promise<ProductEntity> {
    //     const idField = this.getIdField();
    //     return await this.repository.findOne( {where: {[idField]:id} as FindOptionsWhere<ProductEntity>});
    // }

}