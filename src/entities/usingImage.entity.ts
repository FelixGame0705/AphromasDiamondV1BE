import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./products.entity";
import { DiamondEntity } from "./diamond.entity";
import { JewelrySettingEntity } from "./jewelrySetting.entity";
import { Certificate } from "crypto";
import { CertificateEntity } from "./certificate.entity";

@Entity('UsingImage')
export class UsingImageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    UsingImageID: number
    @Column({nullable: true})
    ProductID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable: true})
    JewelrySettingID: number
    @Column({nullable: true})
    Name: string
    @Column({nullable: true})
    url: string
    @Column({nullable: true})
    CertificateID: number
    @ManyToOne(()=> ProductEntity,{nullable: true})
    @JoinColumn({name: 'ProductID', referencedColumnName: 'ProductID'})
    product: ProductEntity
    @ManyToOne(()=> DiamondEntity, {nullable: true})
    @JoinColumn({name: 'DiamondID', referencedColumnName: 'DiamondID'})
    diamond: DiamondEntity
    @ManyToOne(()=>JewelrySettingEntity, {nullable: true})
    @JoinColumn({name: 'JewelrySettingID', referencedColumnName: 'JewelrySettingID'})
    jewelrySetting: JewelrySettingEntity
    @ManyToOne(()=>CertificateEntity, {nullable: true})
    @JoinColumn({name: 'CertificateID', referencedColumnName: 'CertificateID'})
    certificate: CertificateEntity[]
}