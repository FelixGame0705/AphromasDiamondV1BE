import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { DiamondEntity } from "./diamond.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ProductEntity } from "./products.entity";
import { CustomerEntity } from "./customer.entity";

@Entity('OrderLine')
export class OrderLineEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    OrderLineID:number
    @Column({default: 1})
    Quantity: number
    @Column({nullable: true})
    OrderID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable:true})
    ProductID: number
    @Column({nullable: true})
    CustomerID: number
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID', referencedColumnName:'OrderID'})
    order: OrderEntity
    @OneToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>ProductEntity, { nullable: true })
    @JoinColumn({name:'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
    @ManyToOne(()=>CustomerEntity, { nullable: true })
    @JoinColumn({name:'CustomerID', referencedColumnName:'CustomerID'})
    customer: CustomerEntity
}
