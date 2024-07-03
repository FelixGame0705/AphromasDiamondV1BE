import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./products.entity";
import { DiamondEntity } from "./diamond.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";

@Entity('UsingImage')
export class UsingImageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    UsingImageID: number
    @Column()
    ProductID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable: true})
    JewelrySettingID: number
    @Column()
    Name: string
    @Column({nullable: true})
    url: string
    @ManyToOne(()=> ProductEntity,{nullable: true})
    @JoinColumn({name: 'ProductID', referencedColumnName: 'ProductID'})
    product: ProductEntity
    @ManyToOne(()=> DiamondEntity, {nullable: true})
    @JoinColumn({name: 'DiamondID', referencedColumnName: 'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable: true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName: 'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
}