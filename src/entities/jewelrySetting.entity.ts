import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JewelryTypeEntity } from "./jewelryType.entity";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";
import { DiamondEntity } from "./diamond.entity";
import { FeedbackEntity } from "./feedback.entity";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { ProductEntity } from "./products.entity";
import { UsingImageEntity } from "./usingImage.entity";

@Entity('JewelrySetting')
export class JewelrySettingEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    JewelrySettingID: number
    @Column()
    Name: string
    @Column()
    ProductionCost: number
    @Column()
    AuxiliaryCost: number
    @Column()
    IsActive: boolean
    @Column({type:"datetime"})
    UpdateTime: Date
    @Column({nullable: true})
    DiamondShape: string
    @Column({default: 1})
    ChargeRate: number
    @Column({nullable: true})
    JewelryTypeID: number
    @ManyToOne(()=>JewelryTypeEntity, { nullable: true })
    @JoinColumn({name:'JewelryTypeID', referencedColumnName:'JewelryTypeID'})
    jewelryType: JewelryTypeEntity
    @OneToMany(()=>FeedbackEntity, feedback => feedback.jewelrySetting)
    feedback: FeedbackEntity[]
    @OneToMany(()=>JewelrySettingVariantEntity, jewelrySettingVariant => jewelrySettingVariant.jewelrySettings)
    jewelrySettingVariant: JewelrySettingVariantEntity[]
    @OneToMany(()=>ProductEntity, product => product.jewelrySetting)
    products: ProductEntity[]
    @OneToMany(()=>UsingImageEntity, usingImage => usingImage.jewelrySetting)
    usingImage: UsingImageEntity[]
    //done
}