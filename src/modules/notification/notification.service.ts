import { Inject, Injectable } from '@nestjs/common';
import { Notification } from 'src/models/notification.model';
import { INotificationRepository } from 'src/interfaces/INotificationRepository';  
import { PRODUCT_PER_PAGE } from 'src/constants/constant';

@Injectable()
export class NotificationService {

  constructor(
    @Inject('INotificationRepository')  
    private readonly notificationRepository: INotificationRepository
  ) {}

  async findAll(): Promise<Notification[]> {
    return (await this.notificationRepository.findAll());
  }



  async getNoti(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
    const perPage = PRODUCT_PER_PAGE;
    return this.notificationRepository.paginateAndFilter(page, perPage, filters, sort);
  }


  async findById(id: number): Promise<Notification> {
    return await this.notificationRepository.findById(id);
  }

  async create(notification: Notification): Promise<Notification> {
    return await this.notificationRepository.create(notification);
  }

  async update(id: number, notification: Notification): Promise<Notification> {
    await this.notificationRepository.update(id, notification);
    return this.findById(id);
  }

  async delete(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
        throw new Error('Notification not found');
    }
        await this.notificationRepository.delete(id);
        return notification;
  }

  async findRelationById(id: number): Promise<Notification> {
    return await this.notificationRepository.findRelationById(id);
  }
}

 