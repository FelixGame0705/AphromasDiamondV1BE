import { Inject, Injectable } from '@nestjs/common';
import { Notification } from 'src/models/notification.model';
import { INotificationRepository } from 'src/interfaces/INotificationRepository';  

@Injectable()
export class NotificationService {

  constructor(
    @Inject('INotificationRepository')  
    private readonly NotificationRepository: INotificationRepository
  ) {}

  async findAll(): Promise<Notification[]> {
    return (await this.NotificationRepository.findAll());
  }

  async findById(id: number): Promise<Notification> {
    return await this.NotificationRepository.findById(id);
  }

  async create(notification: Notification): Promise<Notification> {
    return await this.NotificationRepository.create(notification);
  }

  async update(id: number, notification: Notification): Promise<Notification> {
    await this.NotificationRepository.update(id, notification);
    return this.findById(id);
  }

  async delete(id: number): Promise<Notification> {
    const notification = await this.NotificationRepository.findById(id);
    if (!notification) {
        throw new Error('Notification not found');
    }
        await this.NotificationRepository.delete(id);
        return notification;
  }

  async findRelationById(id: number): Promise<Notification> {
    return await this.NotificationRepository.findRelationById(id);
  }
}

 