import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountEntity } from "src/entities/discount.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IDiscountRepository } from "src/interfaces/IDiscountRepository";
import { Discount } from "src/models/discount.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class DiscountRepository extends BaseRepository<DiscountEntity, Repository<DiscountEntity>> implements IDiscountRepository{
    constructor(
        @InjectRepository(DiscountEntity)
        protected readonly repository: Repository<DiscountEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Discount> {
        return null;
    }

    protected getIdField(): keyof Discount {
        return 'DiscountID';
    }

    async findAll(): Promise<DiscountEntity[]> {
        return await this.repository.find({where: { IsActive: true } as FindOptionsWhere<DiscountEntity>});
    }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: DiscountEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('diamond');

        // Apply filters
        if (filters.Shape) {
            builder.andWhere("diamond.shape LIKE :Shape", { Shape: `${filters.Shape}` });
        }
        if (filters.Color) {
            builder.andWhere("diamond.color LIKE :Color", { Color: `${filters.Color}` });
        }

        // Apply sorting
        if (sort && sort.field && sort.order) {
            builder.orderBy(`diamond.${sort.field}`, sort.order);
        }

        // Get total count
        const total = await builder.getCount();

        // Apply pagination
        builder.offset((page - 1) * perPage).limit(perPage);

        // Get data
        const data = await builder.getMany();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }

}