import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { DiamondEntity } from "./diamond.entity";
import { ShellEntity } from "./shell.entity";

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
    ShellID: number
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID', referencedColumnName:'OrderID'})
    order: OrderEntity
    @OneToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>ShellEntity, { nullable: true })
    @JoinColumn({name:'ShellID', referencedColumnName:'ShellID'})
    shell: ShellEntity
}
