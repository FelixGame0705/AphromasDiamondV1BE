import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiamondEntity } from "src/entities/diamond.entity";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IOrderLineRepository } from "src/interfaces/IOrderLineRepository";
import { Repository } from "typeorm";

@Injectable()
export class OrderLineRepository extends BaseRepository<OrderLineEntity, Repository<OrderLineEntity>> implements IOrderLineRepository {

    constructor(
        @InjectRepository(OrderLineEntity)
        protected readonly repository: Repository<OrderLineEntity>
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

    async updtae(id: number, data: OrderLineEntity): Promise<OrderLineEntity> {
        const manager = this.repository.manager
        const oldDiamondID = (await this.findById(id)).DiamondID
        // const diamondToUpdate = order.OrderLines.map(orderLine => orderLine.DiamondID);
        await this.repository.update(id, data);
        const newDiamondID = (await this.findById(id)).DiamondID
        if ((await this.findById(id)).OrderID != null) {
            if (newDiamondID != oldDiamondID) {
                await manager
                    .createQueryBuilder()
                    .update(DiamondEntity)
                    .set({ IsActive: false }) // Đặt IsActive thành false, đã bán
                    .where("DiamondID = :id", { id: newDiamondID })
                    .execute();
                await manager
                    .createQueryBuilder()
                    .update(DiamondEntity)
                    .set({ IsActive: true }) // Đặt IsActive thành true, trả lại kho
                    .where("DiamondID = :id", { id: oldDiamondID }) // Cập nhật bản ghi có ID là oldDiamondID
                    .execute();
            }
        }

        return this.findById(id);
    }

}