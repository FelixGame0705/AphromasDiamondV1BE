import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { JewelryTypeEntity } from "./jewelryType.entity";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";

@Entity('Shell')
export class ShellEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ShellID: number
    @Column()
    ProductionCost: number
    @Column()
    IsActive: boolean
    @Column()
    Weight: number
    @Column({nullable:true})
    JewelryTypeID: number
    @Column({nullable: true})
    MarterialJewelrID: number
    @OneToMany(()=>ProductEntity, product=>product.ShellID)
    product: ProductEntity[]
    @ManyToOne(()=>JewelryTypeEntity, { nullable: true })
    @JoinColumn({name:'JewelryTypeID', referencedColumnName:'JewelryTypeID'})
    jewelryType: JewelryTypeEntity
    @ManyToOne(()=>MaterialJewelryEntity, { nullable: true })
    @JoinColumn({name:'MaterialID', referencedColumnName:'MaterialID'})
    materialJewelry:MaterialJewelryEntity
    //done
}