import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JewelryTypeEntity } from "./jewelryType.entity";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";
import { DiamondEntity } from "./diamond.entity";
import { FeedbackEntity } from "./feedback.entity";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { ProductEntity } from "./products.entity";

@Entity('JewelrySetting')
export class JewelrySettingEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    JewelrySettingID: number
    @Column()
    ProductionCost: number
    @Column()
    IsActive: boolean
    @Column()
    Weight: number
    @Column({type:"datetime"})
    UpdateTime: Date
    @Column({nullable: true})
    DiamondShape: string
    @Column({default: 100})
    ChargeRate: number
    @Column({nullable: true})
    JewelryTypeID: number
    @Column({nullable: true})
    ProductID: number
    @ManyToOne(()=>JewelryTypeEntity, { nullable: true })
    @JoinColumn({name:'JewelryTypeID', referencedColumnName:'JewelryTypeID'})
    jewelryType: JewelryTypeEntity
    @OneToMany(()=>DiamondEntity, diamond => diamond.jewelrySetting)
    diamond: DiamondEntity[]
    @OneToMany(()=>FeedbackEntity, feedback => feedback.jewelrySetting)
    feedback: FeedbackEntity[]
    @OneToMany(()=>JewelrySettingVariantEntity, jewelrySettingVariant => jewelrySettingVariant.jewelrySettings)
    jewelrySettingVariant: JewelrySettingVariantEntity[]
    @OneToOne(()=>ProductEntity, product => product.JewelrySettingID)
    @JoinColumn({name:'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
    //done
}