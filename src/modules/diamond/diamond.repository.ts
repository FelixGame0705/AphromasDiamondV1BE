import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiamondEntity } from "src/entities/diamond.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import { Diamond } from "src/models/diamond.model";
import { UsingImage } from "src/models/usingImage.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class DiamondRepository extends BaseRepository<DiamondEntity, Repository<DiamondEntity>> implements IDiamondRepository{
    constructor(
        @InjectRepository(DiamondEntity)
        protected readonly repository: Repository<DiamondEntity>
    ){
        super(repository);
    }
    async findRelationById(id: number): Promise<Diamond> {
        return await this.repository.findOne({where: {[this.getIdField()]:id}, relations: ['usingImage']})
    }

    protected getIdField(): keyof Diamond {
        return 'DiamondID';
    }

    async findAll(): Promise<DiamondEntity[]> {
        return await this.repository.find({where: { IsActive: true } as FindOptionsWhere<DiamondEntity>});
    }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: DiamondEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('diamond').leftJoinAndSelect('diamond.usingImage', 'usingImage');

        // Apply filters
        if (filters.Shape && filters.Shape.length > 0) {
            builder.andWhere("diamond.shape IN (:...Shape)", { Color: filters.Color });
        }
        if (filters.Color && filters.Color.length > 0) {
            builder.andWhere("diamond.color IN (:...Color)", { Color: filters.Color });
        }
        if (filters.minPrice) {
            builder.andWhere("diamond.price >= :minPrice", { minPrice: filters.minPrice });
        }
        if (filters.maxPrice) {
            builder.andWhere("diamond.price <= :maxPrice", { maxPrice: filters.maxPrice });
        }
        if (filters.minCarat) {
            builder.andWhere("diamond.weightcarat >= :minCarat", { minCarat: filters.minCarat });
        }
        if (filters.maxCarat) {
            builder.andWhere("diamond.weightcarat <= :maxCarat", { maxCarat: filters.maxCarat });
        }
        if (filters.Clarity && filters.Clarity.length > 0) {
            builder.andWhere("diamond.clarity IN (:...Clarity)", { Clarity: filters.Clarity });
        }
        if (filters.Cut && filters.Cut.length > 0) {
            builder.andWhere("diamond.cut IN (:...Cut)", { Cut: filters.Cut });
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