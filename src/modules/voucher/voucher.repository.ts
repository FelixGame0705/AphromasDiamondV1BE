import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BillDiscountEntity } from "src/entities/billDiscount.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IBillDiscountRepository } from "src/interfaces/IBillDiscountRepository";
import { BillDiscount } from "src/models/billdiscount.model";
import { Repository } from "typeorm";
 




@Injectable()
export class BillDiscountRepository extends BaseRepository<BillDiscountEntity, Repository<BillDiscountEntity>> implements IBillDiscountRepository{
    constructor(
        @InjectRepository(BillDiscountEntity)
        protected readonly repository: Repository<BillDiscountEntity>
    ){
        super(repository);
    }
   
    findRelationById(id: number): Promise<BillDiscount> {
        return null;
    }ư

    protected getIdField(): keyof BillDiscount {
        return 'BillDiscountID';
    }

    async findAll(): Promise<BillDiscountEntity[]> {
        return await this.repository.find();
    } 
    async paginateAndFilter(page: number, perPage: number, filters: any, sort: { field: string; order: "ASC" | "DESC"; }): Promise<{ data: BillDiscount[]; total: number; page: number; last_page: number; }> {
        throw new Error("Method not implemented.");
    }


}