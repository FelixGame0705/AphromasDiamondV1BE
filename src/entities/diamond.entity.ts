import { BaseEntity, Column, Entity, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CertificateEntity } from "./certificate.entity";
import { ProductEntity } from "./product.entity";
import { OrderLineEntity } from "./orderLine.entity";
@Entity('Diamond')
export class DiamondEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    DiamondID: number;
    @Column({nullable: true})
    Name: string
    @Column({nullable: true})
    Shape: string
    @Column({nullable: true})
    Cut: string
    @Column({nullable: true})
    Price: number
    @Column({nullable: true})
    Color: string
    @Column({nullable: true})
    WeightCarat: number
    @Column({nullable: true})
    PercentDepth: number
    @Column({nullable: true})
    LengthOnWidthRatio: number
    @Column({nullable: true, type:'text'})
    Description: string
    @Column({nullable: true})
    IsActive: boolean
    @Column({nullable: true})
    Fluorescence: string
    @Column({nullable: true})
    Clarity: string
    @Column({nullable: true})
    PercentTable: number
    @Column({nullable: true})
    Polish: string
    @Column({nullable: true})
    Symmetry: string
    @Column({nullable: true})
    ChargeRate: number
    @Column({nullable: true})
    ProductID: number
    @OneToMany(()=>CertificateEntity, certificate=>certificate.Diamond)
    certificate: CertificateEntity[]
    @ManyToOne(()=>ProductEntity, { nullable: true })
    @JoinColumn({name:'ProductID', referencedColumnName:'ProductID'})
    product: ProductEntity
    @OneToOne(()=>OrderLineEntity, orderLine=>orderLine.DiamondID, { nullable: true })
    orderLine: OrderLineEntity
    //done
}