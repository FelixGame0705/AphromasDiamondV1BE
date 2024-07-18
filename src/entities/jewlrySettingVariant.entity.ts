import { AfterInsert, AfterUpdate, BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "./size.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { MaterialJewelry } from "src/models/materialjewelry.model";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";
import { DiamondEntity } from "./diamond.entity";

@Entity('JewelrySettingVariant')
export class JewelrySettingVariantEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    JewelrySettingVariantID: number
    @Column({nullable: true})
    SizeID: number
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    MaterialJewelryID: number
    @Column({ type: 'decimal', precision: 10, scale: 2})
    Weight: number
    @Column({default:0})
    Quantity: number
    @Column({nullable: true})
    Price: number
    @ManyToOne(()=> SizeEntity, {nullable:true})
    @JoinColumn({name:'SizeID', referencedColumnName:'SizeID'})
    size: SizeEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable:true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName:'JewelrySettingID'})
    jewelrySettings: JewelrySettingEntity
    @ManyToOne(()=>MaterialJewelryEntity, {nullable: true})
    @JoinColumn({name:'MaterialJewelryID', referencedColumnName:'MaterialJewelryID'})
    materialJewelry: MaterialJewelryEntity
    
    @OneToMany(()=>DiamondEntity, diamond => diamond.jewelrySettingVariant)
    diamond: DiamondEntity[]

    // @AfterInsert()
    // //@AfterUpdate()
    // initAfterInsert(){
    //     console.log("hello")
    //     this.Price = this.Weight * this.materialJewelry.SellPrice + this.jewelrySettings.AuxiliaryCost + this.jewelrySettings.ProductionCost
    // }
}