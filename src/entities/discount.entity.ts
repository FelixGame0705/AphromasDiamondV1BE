import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./products.entity";
import { DiamondEntity } from "./diamond.entity";

@Entity('Discount')
export class DiscountEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    DiscountID:number
    @Column({nullable: true})
    Name: string
    @Column({nullable:true})
    Description: string
    @Column({type:'datetime', nullable: true})
    StartDate: Date
    @Column({type: 'datetime', nullable: true})
    EndDate: Date
    @Column({default: 0})
    PercentDiscounts: number
    @Column({nullable:true})
    FinalPrice: number
    @OneToMany(()=>ProductEntity, product=>product.discount)
    product: ProductEntity[]
    @OneToMany(()=>DiamondEntity, diamond=>diamond.discount)
    diamond: DiamondEntity[]
}