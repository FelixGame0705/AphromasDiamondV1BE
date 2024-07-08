import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "./size.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { MaterialJewelry } from "src/models/materialjewelry.model";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";

@Entity('JewelrySettingVariant')
export class JewelrySettingVariantEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    JewelrySettingVariantID: number
    @Column()
    SizeID: number
    @Column()
    JewelrySettingID: number
    @Column()
    MaterialJewelryID: number
    @Column()
    Weight: number
    @ManyToOne(()=> SizeEntity, {nullable:true})
    @JoinColumn({name:'SizeID', referencedColumnName:'SizeID'})
    size: SizeEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable:true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName:'JewelrySettingID'})
    jewelrySettings: JewelrySettingEntity
    @ManyToOne(()=>MaterialJewelryEntity, {nullable: true})
    @JoinColumn({name:'MaterialJewelryID', referencedColumnName:'MaterialJewelryID'})
    materialJewelry: MaterialJewelryEntity
}