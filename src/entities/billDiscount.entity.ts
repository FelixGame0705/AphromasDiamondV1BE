import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity('BillDiscount')
export class BillDiscountEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    BillDiscountID:number
    @Column({type:'datetime'})
    StartDate: Date
    @Column({type: 'datetime'})
    EndDate: Date
    @Column()
    PercentDiscounts: number
    @Column({nullable: true})
    OrderID: number
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID',referencedColumnName:'OrderID'})
    order: OrderEntity
    //done
}