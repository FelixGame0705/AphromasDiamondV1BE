import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";

@Entity('MaterialJewelry')
export class MaterialJewelryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    MaterialJewelryID: number
    @Column({nullable:true})
    BuyPrice: number
    @Column({nullable:true})
    SellPrice: number
    @Column({type: "datetime"})
    UpdateTime: Date
    @Column()
    Name: string
    @OneToMany(()=>JewelrySettingVariantEntity, jewelrySettingVariant=> jewelrySettingVariant.MaterialJewelryID)
    jewelrySettingVariant: JewelrySettingVariantEntity[]
    //done
}