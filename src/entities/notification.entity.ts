import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    NotificationId: number;
    @Column()
    IsRead: number;
    @Column()
    Date: number;
    @Column()
    Message: string;
}