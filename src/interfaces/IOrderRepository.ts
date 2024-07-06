import { Notification } from "src/models/notification.model";
import { AbstractPromise } from "./AbstractRepository";
import { OrderLineEntity } from "src/entities/orderLine.entity";
import { Order } from "src/models/order.model";
import { OrderEntity } from "src/entities/order.entity";
import { PaymentDTO } from "src/dto/order.dto";

 export interface IOrderRepository extends AbstractPromise<Order>{
    findRelationOrderLineById(id: number): Promise<Order>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: Order[], total: number, page: number, last_page: number }>;
    payOrder(id: number): Promise<Order>;
}