import { text } from "stream/consumers";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./products.entity";
import { DiamondEntity } from "./diamond.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { ImageEntity } from "./image.entity";

@Entity('UsingImage')
export class UsingImageEntity{
    @PrimaryGeneratedColumn()
    UsingImageID: number
    @Column()
    ProductID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    ImageID: number
    @ManyToOne(()=> ProductEntity,{nullable: true})
    @JoinColumn({name: 'ProductID', referencedColumnName: 'ProductID'})
    product: ProductEntity
    @ManyToOne(()=> DiamondEntity, {nullable: true})
    @JoinColumn({name: 'DiamondID', referencedColumnName: 'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable: true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName: 'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
    @ManyToOne(()=> ImageEntity, {nullable:true})
    @JoinColumn({name: 'ImageID', referencedColumnName:'ImageID'})
    image: ImageEntity
}