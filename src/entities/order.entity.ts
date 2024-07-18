import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VoucherEntity } from "./voucher.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { CustomerEntity } from "./customer.entity";
import { AccountsEntity } from "./accounts.entity";
import { FeedbackEntity } from "./feedback.entity";
import { text } from "stream/consumers";

@Entity('Order')
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    OrderID: number;

    @Column({ type: 'datetime' })
    OrderDate: Date;

    @Column({ type: 'datetime' })
    CompleteDate: Date;

    @Column()
    IsPayed: boolean
    @Column({nullable:true, type: 'decimal', precision: 10, scale: 2})
    Shippingfee: number
    @Column({type:'text', nullable:true})
    ReasonReturn: string
    @Column({type:'text', nullable:true})
    Note: string
    
    @Column({ nullable: true })
    CustomerID: number;

    @Column({ nullable: true })
    OrderStatus: string;

    @Column()
    IsActive: boolean;

    @Column({nullable:true, type: 'decimal', precision: 12, scale: 2})
    Price: number
    @Column({nullable:true, type: 'decimal', precision: 12, scale: 2})
    VoucherPrice: number

    @Column({ nullable: true })
    AccountDeliveryID: number;

    @Column({ nullable: true })
    AccountSaleID: number;

    @Column({nullable: true})
    PaymentID: string

    @Column({nullable: true})
    Method: string

    @Column({nullable: true})
    VoucherID: number
    @ManyToOne(()=>VoucherEntity, { nullable: true })
    @JoinColumn({name:'VoucherID',referencedColumnName:'VoucherID'})
    voucher: VoucherEntity
    // @OneToMany(() => VoucherEntity, voucher => voucher.order)
    // voucher: VoucherEntity[];

    @OneToMany(() => OrderLineEntity, orderLine => orderLine.order)
    @JoinColumn()
    orderLine: OrderLineEntity[];

    @ManyToOne(() => CustomerEntity, { nullable: true })
    @JoinColumn({ name: 'CustomerID', referencedColumnName: 'CustomerID' })
    customer: CustomerEntity;

    @ManyToOne(() => AccountsEntity, { nullable: true })
    @JoinColumn({ name: 'AccountDeliveryID', referencedColumnName: 'AccountID' })
    accountDelivery: AccountsEntity;

    @ManyToOne(() => AccountsEntity, { nullable: true })
    @JoinColumn({ name: 'AccountSaleID', referencedColumnName: 'AccountID' })
    accountSale: AccountsEntity;
    @OneToMany(()=> FeedbackEntity, feedback => feedback.order)
    feedBack: FeedbackEntity[]
}
