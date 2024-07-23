import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "src/entities/notification.entity";
import { NotificationRepository } from "./notification.repository";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { NotificationGateway } from "./notificationGateway";


@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    exports: [NotificationGateway],
    controllers: [NotificationController],
    providers: [NotificationService, {
        useClass: NotificationRepository,
        provide: 'INotificationRepository'
    }, NotificationGateway]
})
export class NotificationModule{

}