import { Notification } from "src/models/notification.model";
import { AbstractPromise } from "./AbstractRepository";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { OrderLine } from "src/models/orderline.model";

 export interface IOrderLineRepository extends AbstractPromise<OrderLine>{
    findRelationById(id: number): Promise<OrderLineEntity>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: OrderLine[], total: number, page: number, last_page: number }>;
}