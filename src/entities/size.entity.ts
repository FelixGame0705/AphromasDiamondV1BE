import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";

@Entity('Size')
export class SizeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    SizeID: number
    @Column()
    SizeValue: number
    @Column()
    UnitOfMeasure: string
    @OneToMany(()=>JewelrySettingVariantEntity, JewelrySettingVariant=>JewelrySettingVariant.size)
    jewelrySettingVariants: JewelrySettingVariantEntity[]
}