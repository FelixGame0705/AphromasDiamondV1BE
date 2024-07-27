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
    @Column({default: 1, nullable: true})
    Quantity: number
    // @Column({nullable: true})
    // Inscription: string
    // @Column({nullable: true})
    // InscriptionFont: string
    @Column({nullable: true})
    Brand: string
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable:true, type: 'decimal', precision: 12, scale: 2})
    Price: number
    @Column({nullable:true, type: 'decimal', precision: 12, scale: 2})
    DiscountPrice: number
    @Column({default:0, type: 'decimal', precision: 3, scale: 1})
    Stars: number
    @Column({nullable: true})
    AccountID: number
    @Column({nullable: true})
    CollectionID: number
    @Column({nullable: true})
    DiscountID: number
    // @Column({nullable: true})
    // JewelrySettingVariantID:number
    @OneToMany(()=>DiamondEntity, diamond=>diamond.products)
    diamonds: DiamondEntity[]
    @ManyToOne(()=>JewelrySettingEntity, {nullable: true})
    @JoinColumn({name:'JewelrySettingID', referencedColumnName:'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
    // @ManyToOne(()=>JewelrySettingVariantEntity, {nullable: true})
    // @JoinColumn({name:'JewelrySettingVariantID', referencedColumnName:'JewelrySettingVariantID'})
    // jewelrySettingVariant: JewelrySettingVariantEntity
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