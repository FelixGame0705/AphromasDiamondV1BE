import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../interfaces/BaseRepository";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotificationEntity } from "../../entities/notification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../../models/notification.model";
import { INotificationRepository } from "../../interfaces/INotificationRepository";

@Injectable()
export class NotificationRepository extends BaseRepository<NotificationEntity, Repository<NotificationEntity>> implements INotificationRepository{
    constructor(
        @InjectRepository(NotificationEntity)
        protected readonly repository: Repository<NotificationEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Notification> {
        return null;
    }

    protected getIdField(): keyof Notification {
        return 'NotificationID';
    }

    async findAll(): Promise<NotificationEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<NotificationEntity>});
    }

}