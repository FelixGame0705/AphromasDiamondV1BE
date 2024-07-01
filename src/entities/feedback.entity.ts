import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiamondEntity } from "./diamond.entity";
import { OrderEntity } from "./order.entity";
import { AccountsEntity } from "./accounts.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ProductEntity } from "./products.entity";

@Entity('Feedback')
export class FeedbackEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    FeedbackID: number
    @Column({nullable: true})
    Stars: number
    @Column({nullable: true, type:'text'})
    Comment:string
    @Column({nullable: true, type:'datetime'})
    CommentTime: Date
    @Column({default: true})
    IsActive: boolean
    @Column({nullable:true})
    DiamondID: number
    @Column({nullable:true})
    JewelrySettingID: number
    @Column({nullable: true})
    OrderID: number
    @Column({nullable: true})
    AccountID: number
    @Column({nullable:true})
    ProductID: number
    @ManyToOne(()=>DiamondEntity, {nullable:true})
    @JoinColumn({name: 'DiamondID', referencedColumnName:'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable:true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName:'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
    @ManyToOne(()=>OrderEntity, {nullable:true})
    @JoinColumn({name: 'OrderID', referencedColumnName:'OrderID'})
    order: OrderEntity
    @ManyToOne(()=>AccountsEntity, {nullable:true})
    @JoinColumn({name: 'AccountID', referencedColumnName:'AccountID'})
    account: AccountsEntity
    @ManyToOne(()=>ProductEntity, {nullable:true})
    @JoinColumn({name: 'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
}