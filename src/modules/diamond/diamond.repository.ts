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
        return await this.repository.findOne({where: {[this.getIdField()]:id}, relations: ['usingImage', 'certificate', 'certificate.usingImages']})
    }

    protected getIdField(): keyof Diamond {
        return 'DiamondID';
    }

    async findAll(): Promise<DiamondEntity[]> {
        let rs =  await this.repository.find({
            relations: ['usingImage']
          });
          return rs;
    }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: DiamondEntity[], total: number, page: number, last_page: number }> {
        // Bước 1: Lấy danh sách IDs của diamonds
        const subQuery = this.repository.createQueryBuilder('diamond')
            .select('diamond.DiamondID');
        // Áp dụng bộ lọc
        if (filters.Shape && filters.Shape.length > 0) {
            subQuery.andWhere("diamond.shape IN (:...Shape)", { Shape: filters.Shape });
        }
        if (filters.Color && filters.Color.length > 0) {
            subQuery.andWhere("diamond.color IN (:...Color)", { Color: filters.Color });
        }
        if (filters.minPrice) {
            subQuery.andWhere("diamond.price >= :minPrice", { minPrice: filters.minPrice });
        }
        if (filters.maxPrice) {
            subQuery.andWhere("diamond.price <= :maxPrice", { maxPrice: filters.maxPrice });
        }
        if (filters.minCarat) {
            subQuery.andWhere("diamond.weightcarat >= :minCarat", { minCarat: filters.minCarat });
        }
        if (filters.maxCarat) {
            subQuery.andWhere("diamond.weightcarat <= :maxCarat", { maxCarat: filters.maxCarat });
        }
        if (filters.Clarity && filters.Clarity.length > 0) {
            subQuery.andWhere("diamond.clarity IN (:...Clarity)", { Clarity: filters.Clarity });
        }
        if (filters.Cut && filters.Cut.length > 0) {
            subQuery.andWhere("diamond.cut IN (:...Cut)", { Cut: filters.Cut });
        }
        if (filters.Quantity ) {
            subQuery.andWhere("diamond.quantity = :Quantity", { Quantity: filters.Quantity });
        }
        // if (filters.IsActive) {
        //     subQuery.andWhere("diamond.IsActive = :IsActive", { IsActive: filters.IsActive });
        // }
        if (filters.IsActive !== undefined) {
            // Chuyển đổi giá trị `IsActive` nếu cần
            const isActive = filters.IsActive === 'true' ? true : filters.IsActive === 'false' ? false : undefined;
            if (isActive !== undefined) {
                subQuery.andWhere("diamond.IsActive = :IsActive", { IsActive: isActive });
            } else {
                // Nếu không có điều kiện lọc cho `IsActive`, không áp dụng điều kiện lọc này
                subQuery.andWhere("diamond.IsActive IS NOT NULL");
            }
        }
    
        // Áp dụng sắp xếp
        if (sort && sort.field && sort.order) {
            subQuery.orderBy(`diamond.${sort.field}`, sort.order);
        }
    
        // Lấy tổng số lượng
        const total = await subQuery.getCount();
    
        // Áp dụng phân trang
        subQuery.offset((page - 1) * perPage).limit(perPage);
    
        // Lấy danh sách IDs của diamonds
        const diamondIds = await subQuery.getRawMany().then(results => results.map(result => result.diamond_DiamondID));
        if (diamondIds.length === 0) { 
            return {
                data: [],
                total,
                page,
                last_page: Math.ceil(total / perPage)
            };
        }
    
        // Bước 2: Truy vấn dữ liệu thực tế dựa trên danh sách IDs
        const builder = this.repository.createQueryBuilder('diamond')
            .leftJoinAndSelect('diamond.usingImage', 'usingImage')
            .whereInIds(diamondIds);
    
        const data = await builder.getMany();
    
        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }
    
}