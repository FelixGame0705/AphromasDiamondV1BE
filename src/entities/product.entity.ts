import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiamondEntity } from "./diamond.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { ShellEntity } from "./shell.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity('Product')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ProductID: number
    @Column({nullable: true})
    ShellID: number
    @Column()
    IsActive: boolean
    @OneToMany(()=>DiamondEntity, diamond=>diamond.ProductID)
    diamond: DiamondEntity[] 
    @OneToMany(()=>OrderLineEntity, orderLine=>orderLine.ProductID)
    order: OrderLineEntity[]
    @ManyToOne(()=>ShellEntity)
    @JoinColumn({name:'ShellID', referencedColumnName:'ShellID'})
    shell:ShellEntity
    @OneToMany(()=>FeedbackEntity, feedback=>feedback.product)
    feedback: FeedbackEntity[]
}