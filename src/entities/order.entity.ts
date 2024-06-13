import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BillDiscountEntity } from "./billDiscount.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { CustomerEntity } from "./customer.entity";
import { AccountsEntity } from "./accounts.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity('Order')
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    OrderID: number;

    @Column({ type: 'datetime' })
    OrderDate: Date;

    @Column({ type: 'datetime' })
    CompleteDate: Date;

    @Column({ nullable: true })
    CustomerID: number;

    @Column({ nullable: true })
    OrderStatus: string;

    @Column()
    IsActive: boolean;

    @Column({ nullable: true })
    AccountDeliveryID: number;

    @Column({ nullable: true })
    AccountSaleID: number;

    @OneToMany(() => BillDiscountEntity, billDiscount => billDiscount.order)
    billDiscount: BillDiscountEntity[];

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
    feedBack: FeedbackEntity
}
