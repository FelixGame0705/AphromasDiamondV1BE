import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentDTO } from "src/dto/order.dto";
import { DiamondEntity } from "src/entities/diamond.entity";
import { OrderEntity } from "src/entities/order.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IOrderRepository } from "src/interfaces/IOrderRepository";
import { Order } from "src/models/order.model";
import { DataSource, EntityManager, FindOptionsWhere, Repository, getManager } from "typeorm";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity, Repository<OrderEntity>> implements IOrderRepository {

    constructor(
        @InjectRepository(OrderEntity)
        protected readonly repository: Repository<OrderEntity>
    ) {
        super(repository);
    }
    @Transactional()
    async payOrder(id: number): Promise<Order> {
        const manager = this.repository.manager
        const order = await this.findRelationOrderLineById(id);
        const diamondsToUpdate = order.OrderLines.map(orderLine => orderLine.DiamondID);
        await manager
            .createQueryBuilder()
            .update(DiamondEntity)
            .set({ IsActive: true })
            .whereInIds(diamondsToUpdate)
            .execute();

        order.OrderStatus = 'Completed';
        await manager.save(OrderEntity, order);
        return this.findRelationOrderLineById(id);
        // async (manager: EntityManager) => {
        //     const order = await this.findRelationOrderLineById(id);
        //     const diamondsToUpdate = order.OrderLines.map(orderLine => orderLine);
        //     console.error("Diamond up aaaaaaaaa" + diamondsToUpdate)
        //     await manager
        //         .createQueryBuilder()
        //         .update(DiamondEntity)
        //         .set({ IsActive: false })
        //         .whereInIds(diamondsToUpdate)
        //         .execute();

        //     order.OrderStatus = 'Complete';
        //     await manager.save(OrderEntity, order);


        // }
        // return this.findRelationOrderLineById(id);
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
            builder.andWhere("order.Status LIKE :Status", { Status: `${filters.Status}` });
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
    async findRelationOrderLineById(id: number): Promise<any> {
        // const [orderWithOrderLine, orderWithAccountDelivery] = await Promise.all([
        //     this.repository.findOne({ where: { OrderID: id }, relations: ['orderLine'] }),
        //     this.repository.findOne({ where: { OrderID: id }, relations: ['accountDelivery'] })
        // ]);

        // if (orderWithOrderLine && orderWithAccountDelivery) {
        //     return {
        //         ...orderWithOrderLine,
        //         accountDelivery: orderWithAccountDelivery.accountDelivery,
        //     } as Order;
        // }

        //return orderWithOrderLine || orderWithAccountDelivery;
        const order = await this.repository.createQueryBuilder('order')
            .leftJoinAndSelect('order.accountDelivery', 'account')
            .leftJoinAndSelect('order.orderLine', 'orderline')
            .leftJoinAndSelect('orderline.diamond', 'diamond')
            .select([
                'order.OrderID',
                'order.OrderDate',
                'order.CompleteDate',
                'order.OrderStatus',
                'account.Name',
                'account.PhoneNumber',
                'orderline.OrderLineID',
                'diamond.Price'
            ])
            .where('order.OrderID = :id', { id })
            .getRawMany();

        if (order.length === 0) {
            return null; // or throw an error if the order is not found
        }

        // Truy vấn phụ để tính tổng giá trị của các viên kim cương
        const totalPriceResult = await this.repository.createQueryBuilder('order')
            .leftJoin('order.orderLine', 'orderline')
            .leftJoin('orderline.diamond', 'diamond')
            .select('SUM(diamond.Price)', 'totalPrice')
            .where('order.OrderID = :id', { id })
            .getRawOne();

        const totalPrice = totalPriceResult.totalPrice;

        // Chuẩn bị dữ liệu trả về
        const response = {
            OrderID: order[0].order_OrderID,
            OrderDate: order[0].order_OrderDate,
            CompleteDate: order[0].order_CompleteDate,
            OrderStatus: order[0].order_OrderStatus,
            AccountName: order[0].account_Name,
            AccountPhoneNumber: order[0].account_PhoneNumber,
            OrderLines: order.map(item => ({
                OrderLineID: item.orderline_OrderLineID,
                DiamondPrice: item.diamond_Price
            })),
            TotalPrice: totalPrice
        };

        return response;
    }

}