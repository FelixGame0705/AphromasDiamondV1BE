import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingEntity } from "./jewelrySetting.entity";

@Entity('JewelryType')
export class JewelryTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    JewelryTypeID: number
    @Column()
    Name: string
    @OneToMany(()=>JewelrySettingEntity, jewelrySetting => jewelrySetting.jewelryType)
    jewelrySettings: JewelrySettingEntity[]
    //done
}