import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity('Voucher')
export class VoucherEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    VoucherID:number
    @Column({nullable: true})
    VoucherCode: string
    @Column({nullable:true})
    Description: string
    @Column({type:'datetime'})
    StartDate: Date
    @Column({type: 'datetime'})
    EndDate: Date
    @Column({type: 'decimal', precision: 8, scale: 2})
    PercentDiscounts: number
    @Column({nullable: true})
    OrderID: number
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID',referencedColumnName:'OrderID'})
    order: OrderEntity
    //done
}