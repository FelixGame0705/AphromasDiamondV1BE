import { BaseEntity, Column, Entity, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CertificateEntity } from "./certificate.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { FeedbackEntity } from "./feedback.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ProductEntity } from "./products.entity";
import { CollectionEntity } from "./collection.entity";
import { DiscountEntity } from "./discount.entity";
import { UsingImageEntity } from "./usingImage.entity";
@Entity('Diamond')
export class DiamondEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    DiamondID: number;
    @Column({nullable: true})
    Name: string
    @Column({nullable: true})
    Shape: string
    @Column({nullable: true})
    Cut: string
    @Column({nullable: true})
    Price: number
    @Column({nullable: true})
    Color: string
    @Column({nullable: true})
    WeightCarat: number
    @Column({nullable: true})
    PercentDepth: number
    @Column({nullable: true})
    LengthOnWidthRatio: number
    @Column({nullable: true, type:'text'})
    Description: string
    @Column({nullable: true})
    IsActive: boolean
    @Column({nullable: true})
    Fluorescence: string
    @Column({nullable: true})
    Clarity: string
    @Column({nullable: true})
    PercentTable: number
    @Column({nullable: true})
    Polish: string
    @Column({nullable: true})
    Symmetry: string
    @Column({nullable: true})
    ChargeRate: number
    @Column({type: "datetime"})
    UpdateTime: Date
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    ProductID: number
    @Column({nullable: true})
    CollectionID: number
    @Column({nullable: true})
    DiscountID: number
    @OneToMany(()=>CertificateEntity, certificate=>certificate.Diamond)
    certificate: CertificateEntity[]
    @ManyToOne(()=>JewelrySettingEntity, { nullable: true })
    @JoinColumn({name:'JewelrySettingID', referencedColumnName:'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
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