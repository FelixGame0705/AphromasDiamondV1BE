import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { CustomerEntity } from "./customer.entity";
import { FeedbackEntity } from "./feedback.entity";
import { CollectionEntity } from "./collection.entity";
import { ProductEntity } from "./products.entity";
@Entity('Account')
export class AccountsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    AccountID: number;
    @Column()
    Name:string;
    @Column({type:'varchar', length: 13})
    PhoneNumber:string
    @Column({unique: true, type:'varchar', length: 255})
    Email:string;
    @Column()
    Password:string;
    @Column()
    Role:string;
    @Column({nullable:true})
    CustomerID:number;
    @OneToMany(()=>NotificationEntity, notification => notification.Account)
    notification: NotificationEntity[]
    @OneToOne(()=>CustomerEntity, customer=>customer.account,{ nullable: true })
    @JoinColumn({name:'CustomerID', referencedColumnName:'CustomerID'})
    customer:CustomerEntity
    @OneToMany(()=>FeedbackEntity, feedback => feedback.account)
    feedback: FeedbackEntity[]
    @OneToMany(()=>ProductEntity, product => product.account)
    product: ProductEntity[]
    //Done
}