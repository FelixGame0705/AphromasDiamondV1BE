import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { DiamondEntity } from "./diamond.entity";
import { CustomerEntity } from "./customer.entity";
import { AccountsEntity } from "./accounts.entity";
import { CollectionEntity } from "./collection.entity";
import { DiscountEntity } from "./discount.entity";
import { UsingImageEntity } from "./usingImage.entity";

@Entity('Product')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ProductID: number
    @Column({nullable: true})
    Name: string
    @Column({nullable: true})
    Inscription: string
    @Column({nullable: true})
    InscriptionFont: string
    @Column({nullable: true})
    Brand: string
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    AccountID: number
    @Column({nullable: true})
    CollectionID: number
    @Column({nullable: true})
    DiscountID: number
    @OneToMany(()=>DiamondEntity, diamond=>diamond.products)
    diamonds: DiamondEntity[]
    @OneToOne(()=>JewelrySettingEntity, jewelrySetting => jewelrySetting.ProductID)
    jewelrySettings: JewelrySettingEntity[]
    @ManyToOne(()=>AccountsEntity, {nullable:true})
    @JoinColumn({name:'AccountID', referencedColumnName:'AccountID'})
    account: AccountsEntity
    @ManyToOne(()=>CollectionEntity, {nullable: true})
    @JoinColumn({name: 'CollectionID', referencedColumnName:'CollectionID'})
    collection: CollectionEntity
    @ManyToOne(()=>DiscountEntity, {nullable: true})
    @JoinColumn({name: 'DiscountID', referencedColumnName:'DiscountID'})
    discount: DiscountEntity
    @OneToMany(()=>UsingImageEntity, usingImage => usingImage.product)
    usingImage: UsingImageEntity[]
}