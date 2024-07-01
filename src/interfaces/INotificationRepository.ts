import { Notification } from "src/models/notification.model";
import { AbstractPromise } from "./AbstractRepository";

 export interface INotificationRepository extends AbstractPromise<Notification>{
    findRelationById(id: number): Promise<Notification>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, notificate: 'ASC' | 'DESC' }
    ): Promise<{ data: Notification[], total: number, page: number, last_page: number }>;
}