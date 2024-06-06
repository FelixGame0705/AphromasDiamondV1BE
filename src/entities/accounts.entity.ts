import { IsPhoneNumber } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { CustomerEntity } from "./customer.entity";
@Entity('Account')
export class AccountsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    AccountID: number;
    @Column()
    Name:string;
    @Column()
    @IsPhoneNumber()
    PhoneNumber:string
    @Column({unique: true})
    Username:string;
    @Column()
    Password:string;
    @Column()
    Role:string;
    @OneToMany(()=>NotificationEntity, notification => notification.Account)
    notification: NotificationEntity[]
    @OneToOne(()=>CustomerEntity, customer=>customer.CustomerID, { nullable: true })
    @JoinColumn()
    customer:CustomerEntity
    //Done
}