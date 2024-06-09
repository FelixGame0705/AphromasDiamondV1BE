import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IOrderRepository } from "src/interfaces/IOrderRepository";
import { Order } from "src/models/order.model";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity, Repository<OrderEntity>> implements IOrderRepository{

    constructor(
        @InjectRepository(OrderEntity)
        protected readonly repository: Repository<OrderEntity>
    ){
        super(repository);
    }
    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: OrderEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('order');

        // Apply filters
        if (filters.Status) {
            builder.andWhere("order.Status LIKE :Status", { Shape: `${filters.Status}` });
        }

        // Apply sorting
        if (sort && sort.field && sort.order) {
            builder.orderBy(`order.${sort.field}`, sort.order);
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

    protected getIdField(): keyof OrderEntity {
        return "OrderID";
    }
    findRelationById(id: number): Promise<OrderEntity> {
        return null;
    }

}