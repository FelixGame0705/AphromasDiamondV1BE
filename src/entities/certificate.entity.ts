import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DiamondEntity } from "./diamond.entity";
import { UsingImageEntity } from "./usingImage.entity";

@Entity('Certificate')
export class CertificateEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    CertificateID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable: true})
    Name: string
    @ManyToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    Diamond: DiamondEntity
    @OneToMany(()=>UsingImageEntity, usingImage=>usingImage.certificate)
    usingImages: UsingImageEntity[]
    //done
}