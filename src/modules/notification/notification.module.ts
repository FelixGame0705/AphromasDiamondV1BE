import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "../../entities/notification.entity";
import { NotificationRepository } from "./notification.repository";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";


@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    controllers: [NotificationController],
    providers: [NotificationService, {
        useClass: NotificationRepository,
        provide: 'INotificationRepository'
    }]
})
export class NotificationModule{

}