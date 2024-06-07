import { Notification } from "src/models/notification.model";
import { AbstractPromise } from "./AbstractRepository";

 export interface INotificationRepository extends AbstractPromise<Notification>{
    findRelationById(id: number): Promise<Notification>;
}