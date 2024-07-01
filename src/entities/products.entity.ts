import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JewelrySettingVariantEntity } from "./jewlrySettingVariant.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { DiamondEntity } from "./diamond.entity";
import { CustomerEntity } from "./customer.entity";

@Entity('Product')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ProductID: number
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    CustomerID: string
    @OneToMany(()=>DiamondEntity, diamond=>diamond.ProductID)
    diamonds: DiamondEntity[]
    @OneToOne(()=>JewelrySettingEntity, jewelrySetting => jewelrySetting.ProductID)
    jewelrySettings: JewelrySettingEntity[]
    @ManyToOne(()=>CustomerEntity, {nullable:true})
    @JoinColumn({name:'CustomerID', referencedColumnName:'CustomerID'})
    customer: CustomerEntity
}