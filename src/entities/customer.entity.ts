import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountsEntity } from "./accounts.entity";
import { OrderEntity } from "./order.entity";
@Entity('Customer')
export class CustomerEntity{
    @PrimaryGeneratedColumn()
    CustomerID: number
    @Column({nullable: true, type: Date})
    Birthday: Date
    @Column({nullable:true})
    Gender: boolean
    @Column({nullable: true})
    Address: string
    @OneToOne(()=>AccountsEntity, customer=>customer.AccountID, { nullable: true })
    @JoinColumn({name:'CustomerID', referencedColumnName:'AccountID'})
    account:AccountsEntity
    @OneToMany(()=>OrderEntity, order=>order.OrderID)
    order: OrderEntity[]
    //done
}