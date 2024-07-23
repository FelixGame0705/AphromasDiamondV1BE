import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";
import { DiamondEntity } from "src/entities/diamond.entity";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { ProductEntity } from "src/entities/products.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IOrderLineRepository } from "src/interfaces/IOrderLineRepository";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class OrderLineRepository extends BaseRepository<OrderLineEntity, Repository<OrderLineEntity>> implements IOrderLineRepository {

    constructor(
        @InjectRepository(OrderLineEntity)
        protected readonly repository: Repository<OrderLineEntity>,
        @InjectRepository(DiamondEntity)
        protected readonly diamondRepository: Repository<DiamondEntity>,
        @InjectRepository(ProductEntity)
        protected readonly productRepository: Repository<ProductEntity>
    ) {
        super(repository);
    }
    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: OrderLineEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('order');

        // Apply filters
        if (filters.Status) {
            builder.andWhere("orderline.Status LIKE :Status", { Shape: `${filters.Status}` });
        }

        // Apply sorting
        if (sort && sort.field && sort.order) {
            builder.orderBy(`orderline.${sort.field}`, sort.order);
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

    protected getIdField(): keyof OrderLineEntity {
        return "OrderLineID";
    }
    findRelationById(id: number): Promise<OrderLineEntity> {
        return null;
    }

    async create(data: OrderLineEntity): Promise<OrderLineEntity> {
        let diamond = null
        let product = null
        if (data.DiamondID != null)
            diamond = (await this.diamondRepository.findOne({where: {DiamondID: data.DiamondID}}))
        if (data.ProductID != null)
            product = (await this.productRepository.findOne({where: {ProductID: data.ProductID}}))
        // const diamondToUpdate = order.OrderLines.map(orderLine => orderLine.DiamondID);
        if (diamond != null) {
            if ((diamond.Quantity - data.Quantity >= 0 && diamond.IsActive))
                return this.repository.save(data);
        }
        else if(product != null){
            if ((product.Quantity -data.Quantity >=0))
                return this.repository.save(data);

        }
        throw error
    }

    @Transactional()
    async update(id: number, data: OrderLineEntity): Promise<OrderLineEntity> {
        let diamond = null
        let product = null
        if (data.DiamondID != null)
            diamond = (await this.diamondRepository.findOne({where: {DiamondID: data.DiamondID}}))
        if (data.ProductID != null)
            product = (await this.productRepository.findOne({where: {ProductID: data.ProductID}}))
        // const diamondToUpdate = order.OrderLines.map(orderLine => orderLine.DiamondID);
       
        if (diamond != null) {
            if ((diamond.Quantity - data.Quantity >= 0 && diamond.IsActive)){
                await this.repository.update({OrderLineID:id},data)
            }
        }
        else if (product != null) {
            if ((product.Quantity - data.Quantity >= 0)){
                await this.repository.update({OrderLineID:id},data)
            }
        }
        return this.findById(id);
    }

}