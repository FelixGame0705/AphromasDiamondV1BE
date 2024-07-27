import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/products.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IProductRepository } from "src/interfaces/IProductRepository";
import { Product } from "src/models/product.model";
import { Collection, FindOptionsWhere, In, Like, Repository } from "typeorm";
import { DiamondRepository } from "../diamond/diamond.repository";
import { DiamondEntity } from "src/entities/diamond.entity";

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity, Repository<ProductEntity>> implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly repository: Repository<ProductEntity>
    ) {
        super(repository);
    }
    async findRelationById(id: number): Promise<ProductEntity> {

        const rs = await this.repository.findOne({ where: { [this.getIdField()]: id }, relations: ['diamonds', 'usingImage', 'jewelrySetting', 'jewelrySetting.jewelrySettingVariant', 'jewelrySetting.jewelryType', 'diamonds.certificate', 'discount', 'diamonds.usingImage', 'jewelrySetting.usingImage', 'jewelrySetting.jewelrySettingVariant.materialJewelry'] })
        return rs;
        //return await this.repository.findOne({where: {[this.getIdField()]:id}, relations: ['diamonds']})
    }

    protected getIdField(): keyof ProductEntity {
        return 'ProductID';
    }

    async findAll(): Promise<ProductEntity[]> {

        const dataRs = await this.repository.find({ relations: ['diamonds', 'usingImage', 'discount', 'jewelrySetting', 'jewelrySetting.jewelrySettingVariant', 'jewelrySetting.jewelryType'] })
        // const builder = this.repository.createQueryBuilder('product')
        // .leftJoinAndSelect('product.diamonds', 'diamonds')
        // .leftJoinAndSelect('product.discount', 'discount')
        // .leftJoinAndSelect('product.usingImage','usingImage')
        // .leftJoinAndSelect('product.jewelrySetting', 'jewelrySetting')
        // .leftJoinAndSelect('jewelrySetting.jewelrySettingVariant','JewelrySettingVariant')
        // .leftJoinAndSelect('jewelrySetting.jewelryType', 'jewelryType')
        // const data = await builder.getMany();

        return dataRs;
    }

    // async findById(id: number): Promise<ProductEntity> {
    //     const idField = this.getIdField();
    //     return await this.repository.findOne( {where: {[idField]:id} as FindOptionsWhere<ProductEntity>});
    // }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: any[], total: number, page: number, last_page: number }> {

        // Calculate skip value for pagination
        const skip = (page - 1) * perPage;

        // Create query options
        const findOptions: any = {
            relations: ['diamonds', 'usingImage', 'discount', 'jewelrySetting', 'jewelrySetting.jewelrySettingVariant', 'jewelrySetting.jewelryType'],
            skip: skip,
            take: perPage,
            order: {}
        };

        // Apply sorting
        if (sort && sort.field && sort.order) {
            findOptions.order[sort.field] = sort.order;
        }

        // Apply filters
        const whereConditions: any = {};
        if (filters.Brand && filters.Brand.length > 0) {
            whereConditions['Brand'] = In(filters.Brand);
        }
        if (filters.Collection && filters.Collection.length > 0) {
            whereConditions['Collection'] = In(filters.Collection);
        }
        if (filters.Name ) {
            whereConditions['Name'] = Like(`%${filters.Name}%`);
        }


        // Apply filters to find options
        findOptions.where = whereConditions;

        // Get filtered and sorted data
        const data = await this.repository.find(findOptions);
        let dataReturn = data;
        if (filters.DiamondShape && filters.DiamondShape.length > 0) {
            dataReturn = data.filter(product => {
                console.log('Product Shapes:', product.jewelrySetting.DiamondShape);
                return filters.DiamondShape.every(shape => {
                    if (product.jewelrySetting.DiamondShape != null)
                        return product.jewelrySetting.DiamondShape.includes(shape);
                }
                )
            });
        }

        if (filters.JewelryType && filters.JewelryType.length > 0) {
            dataReturn = dataReturn.filter(product =>
                filters.JewelryType.every(type => {
                    if (product.jewelrySetting.jewelryType.Name != null)
                        return product.jewelrySetting.jewelryType.Name.includes(type)
                }
                )
            );
        }

        // Get total count without pagination
        const totalCount = dataReturn.length;

        // Process data to include aggregated values
        const enrichedData = dataReturn.filter(item => {
            const totalDiamondPrice = item.diamonds.reduce((sum, diamond) => sum + diamond.Price, 0);
            const firstVariantPrice = item.jewelrySetting.jewelrySettingVariant
                ? Math.min(...item.jewelrySetting.jewelrySettingVariant.map(v => v.Price))
                : 0;
            const totalPrice = totalDiamondPrice + firstVariantPrice;

            // Apply minPrice and maxPrice filters
            return (!filters.minPrice || totalPrice >= filters.minPrice) &&
                (!filters.maxPrice || totalPrice <= filters.maxPrice);
        }).map(item => {
            const totalDiamondPrice = item.diamonds.reduce((sum, diamond) => sum + diamond.Price, 0);
            const firstVariantPrice = item.jewelrySetting.jewelrySettingVariant
                ? Math.min(...item.jewelrySetting.jewelrySettingVariant.map(v => v.Price))
                : 0;
            return {
                ...item,
                TotalDiamondPrice: totalDiamondPrice,
                FirstPrice: totalDiamondPrice + firstVariantPrice,
            };
        });



        return {
            data: enrichedData,
            total: totalCount,
            page,
            last_page: Math.ceil(totalCount / perPage)
        };
    }

}

