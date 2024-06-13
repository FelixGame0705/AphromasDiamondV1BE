import { BaseEntity, Column, Entity, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CertificateEntity } from "./certificate.entity";
import { OrderLineEntity } from "./orderLine.entity";
import { FeedbackEntity } from "./feedback.entity";
import { ShellEntity } from "./shell.entity";
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
    @Column({type: "datetime"})
    UpdateTime: Date
    @Column({nullable: true})
    ShellID: number
    @OneToMany(()=>CertificateEntity, certificate=>certificate.Diamond)
    certificate: CertificateEntity[]
    @ManyToOne(()=>ShellEntity, { nullable: true })
    @JoinColumn({name:'ShellID', referencedColumnName:'ShellID'})
    shell: ShellEntity
    @OneToOne(()=>OrderLineEntity, orderLine=>orderLine.DiamondID, { nullable: true })
    orderLine: OrderLineEntity
    @OneToMany(()=>FeedbackEntity, customer=>customer.diamond)
    feedback: FeedbackEntity[]
    //done
}