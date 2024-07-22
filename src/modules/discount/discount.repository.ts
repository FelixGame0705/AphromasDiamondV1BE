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
    async findRelationById(id: number): Promise<Discount> {
        return await this.repository.findOne({where:{DiscountID: id}})
    }

    protected getIdField(): keyof Discount {
        return 'DiscountID';
    }

    async findAll(): Promise<DiscountEntity[]> {
        return await this.repository.find();
    }

    

}