import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { OrderLineEntity } from "./orderLine.entity";

@Entity('Size')
export class SizeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    SizeID: number
    @Column({ type: 'decimal', precision: 8, scale: 2})
    SizeValue: number
    @Column()
    UnitOfMeasure: string
    @OneToMany(()=>OrderLineEntity, orderline=>orderline.size)
    orderlines: OrderLineEntity[]
}