import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VoucherEntity } from "src/entities/voucher.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IVoucherRepository } from "src/interfaces/IVoucherRepository";
import { Voucher } from "src/models/voucher.model";
import { Repository } from "typeorm";
 




@Injectable()
export class VoucherRepository extends BaseRepository<VoucherEntity, Repository<VoucherEntity>> implements IVoucherRepository{
    constructor(
        @InjectRepository(VoucherEntity)
        protected readonly repository: Repository<VoucherEntity>
    ){
        super(repository);
    }
   
    findRelationById(id: number): Promise<Voucher> {
        return null;
    }ư

    protected getIdField(): keyof Voucher {
        return 'VoucherID';
    }

    async findAll(): Promise<VoucherEntity[]> {
        return await this.repository.find();
    } 
    async paginateAndFilter(page: number, perPage: number, filters: any, sort: { field: string; order: "ASC" | "DESC"; }): Promise<{ data: Voucher[]; total: number; page: number; last_page: number; }> {
        throw new Error("Method not implemented.");
    }


}