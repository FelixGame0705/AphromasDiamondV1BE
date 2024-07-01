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
        return 'NotificationID';
    }

    async findAll(): Promise<NotificationEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<NotificationEntity>});
    }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters:  any,
        sort: { field: string, notificate: 'ASC' | 'DESC' }
    ): Promise<{ data: NotificationEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('notification');
    
        // Áp dụng bộ lọc  
        if (filters.isRead) {
            builder.andWhere("notification.isRead LIKE = :IsRead", { isRead: `${filters.isRead}` });
        }
        if (filters.UnRead) {
            builder.andWhere("notification.UnRead LIKE = :UnRead", { isRead: `${filters.UnRead}` });
        }
         //  Sắp xếp 
         if (sort && sort.field && sort.notificate) {
            builder.orderBy(`notification.${sort.field}`, sort.notificate);
        }

    
        // Lấy tổng số lượng thông báo phù hợp với tiêu chí lọc
        const total = await builder.getCount();
    
        // Áp dụng phân trang: bỏ qua (page-1) * perPage mục đầu tiên, giới hạn số mục là perPage
        builder.skip((page - 1) * perPage).take(perPage);
    
        // Lấy dữ liệu cho trang hiện tại
        const data = await builder.getMany();
    
        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage) // Tổng số trang
        };
    }
}