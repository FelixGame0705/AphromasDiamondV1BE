import { Notification } from "src/models/notification.model";
import { AbstractPromise } from "./AbstractRepository";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { Order } from "src/models/order.model";
import { OrderEntity } from "src/entities/order.entity";

 export interface IOrderRepository extends AbstractPromise<Order>{
    findRelationById(id: number): Promise<OrderEntity>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Order[], total: number, page: number, last_page: number }>;
}