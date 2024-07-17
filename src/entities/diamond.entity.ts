import { BaseEntity, Check, Column, Entity, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CertificateEntity } from "./certificate.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { FeedbackEntity } from "./feedback.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ProductEntity } from "./products.entity";
import { CollectionEntity } from "./collection.entity";
import { DiscountEntity } from "./discount.entity";
import { UsingImageEntity } from "./usingImage.entity";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
@Entity('Diamond')
@Check(`"Quantity" IN (0, 1)`)
export class DiamondEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    DiamondID: number;
    @Column({nullable: true})
    Name: string
    @Column({nullable: true})
    Shape: string
    @Column({nullable: true})
    Cut: string
    @Column({nullable: true, type: 'decimal', precision: 12, scale: 2})
    Price: number
    @Column({nullable: true, type: 'decimal', precision: 12, scale: 2})
    DiscountPrice: number
    @Column({nullable: true})
    Color: string
    @Column({nullable: true, type: 'decimal', precision: 7, scale: 3})
    WeightCarat: number
    @Column({nullable: true, type: 'decimal', precision: 7, scale: 3})
    PercentDepth: number
    @Column({nullable: true, type: 'decimal', precision: 7, scale: 2})
    LengthOnWidthRatio: number
    @Column({nullable: true, type:'text'})
    Description: string
    @Column({nullable: true})
    IsActive: boolean
    @Column({nullable: true})
    Fluorescence: string
    @Column({nullable: true})
    Clarity: string
    @Column({nullable: true, type: 'decimal', precision: 7, scale: 2})
    PercentTable: number
    @Column({nullable: true})
    Polish: string
    @Column({nullable: true})
    Symmetry: string
    @Column({nullable: true, type: 'decimal', precision: 7, scale: 2})
    ChargeRate: number
    @Column({type: "datetime"})
    UpdateTime: Date
    @Column({default:0, type: 'decimal', precision: 3, scale: 1})
    Stars: number
    @Column({nullable: true})
    JewelrySettingVariantID: number
    @Column({nullable: true})
    ProductID: number
    @Column({nullable: true})
    CollectionID: number
    @Column({nullable: true})
    DiscountID: number
    @Column({nullable: true})
    Designer: string
    @Column({nullable: true})
    Cutter: string
    @Column({nullable: true})// use to group diamond in 1 variant jewelry setting
    IndexVariantGroup: number
    @Column({default: 1})
    Quantity: number // 0 or 1
    @OneToMany(()=>CertificateEntity, certificate=>certificate.Diamond)
    certificate: CertificateEntity[]
    @ManyToOne(()=>JewelrySettingVariantEntity, { nullable: true })
    @JoinColumn({name:'JewelrySettingVariantID', referencedColumnName:'JewelrySettingVariantID'})
    jewelrySettingVariant: JewelrySettingVariantEntity
    @OneToOne(()=>OrderLineEntity, orderLine=>orderLine.DiamondID, { nullable: true })
    orderLine: OrderLineEntity
    @OneToMany(()=>FeedbackEntity, feedback=>feedback.diamond)
    feedback: FeedbackEntity[]
    @ManyToOne(()=>ProductEntity, {nullable: true})
    @JoinColumn({name:'ProductID', referencedColumnName: 'ProductID'})
    products: ProductEntity
    @ManyToOne(()=>CollectionEntity,{nullable: true})
    @JoinColumn({name:'CollectionID', referencedColumnName:'CollectionID'})
    collection: CollectionEntity
    @ManyToOne(()=>DiscountEntity,{nullable: true})
    @JoinColumn({name:'DiscountID', referencedColumnName: 'DiscountID'})
    discount: DiscountEntity
    @OneToMany(()=>UsingImageEntity, usingImage => usingImage.diamond)
    usingImage: UsingImageEntity[]
    //done
}