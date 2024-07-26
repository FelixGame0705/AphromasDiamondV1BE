import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { DiamondEntity } from "./diamond.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ProductEntity } from "./products.entity";
import { CustomerEntity } from "./customer.entity";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { SizeEntity } from "./size.entity";

@Entity('OrderLine')
export class OrderLineEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    OrderLineID:number
    @Column({default: 1})
    Quantity: number
    @Column({nullable: true})
    Price: number
    @Column({nullable: true})
    DiscountPrice: number
    @Column({nullable: true})
    OrderID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable:true})
    ProductID: number
    @Column({nullable: true})
    CustomerID: number
    @Column({nullable: true})
    Inscription: string
    @Column({nullable: true})
    InscriptionFont: string
    @Column({nullable: true})
    JewelrySettingVariantID: number
    @Column({nullable: true})
    SizeID: number
    @ManyToOne(()=>JewelrySettingVariantEntity, { nullable: true })
    @JoinColumn({name:'JewelrySettingVariantID', referencedColumnName:'JewelrySettingVariantID'})
    jewelrySettingVariants: JewelrySettingVariantEntity
    @ManyToOne(()=>OrderEntity, { nullable: true })
    @JoinColumn({name:'OrderID', referencedColumnName:'OrderID'})
    order: OrderEntity
    @ManyToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>ProductEntity, { nullable: true })
    @JoinColumn({name:'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
    @ManyToOne(()=>CustomerEntity, { nullable: true })
    @JoinColumn({name:'CustomerID', referencedColumnName:'CustomerID'})
    customer: CustomerEntity
    @ManyToOne(()=> SizeEntity, {nullable:true})
    @JoinColumn({name:'SizeID', referencedColumnName:'SizeID'})
    size: SizeEntity
}
