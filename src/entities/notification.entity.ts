import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountsEntity } from "./accounts.entity";

@Entity('Notification')
export class NotificationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    NotificationID: number
    @Column()
    IsRead: boolean
    @Column({type: 'datetime', nullable: true})
    Date: Date
    @Column({nullable: true})
    Message: string
    @Column({nullable: true})
    AccountID: number
    @ManyToOne(()=>AccountsEntity, { nullable: true })
    @JoinColumn({name:'AccountID', referencedColumnName:'AccountID'})
    Account: AccountsEntity
    //done
}