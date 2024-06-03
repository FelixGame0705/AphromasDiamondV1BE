import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotificationEntity } from "src/entities/notification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "src/models/notification.model";
import { INotificationRepository } from "src/interfaces/INotificationRepository";

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
        return 'NotificationId';
    }

    async findAll(): Promise<NotificationEntity[]> {
        return await this.repository.find({where: { IsActive: true } as FindOptionsWhere<NotificationEntity>});
    }

}