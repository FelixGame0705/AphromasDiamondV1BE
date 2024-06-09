import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { DiamondEntity } from "./diamond.entity";
import { ProductEntity } from "./product.entity";

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
    @Column({nullable: true})
    ProductID: number
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID', referencedColumnName:'OrderID'})
    order: OrderEntity
    @OneToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>ProductEntity, { nullable: true })
    @JoinColumn({name:'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
}
