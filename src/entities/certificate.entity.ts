import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DiamondEntity } from "./diamond.entity";

@Entity('Certificate')
export class CertificateEntity{
    @PrimaryGeneratedColumn()
    CerID: number
    @Column({nullable: true})
    DiamondID: number
    @Column({nullable: true})
    Name: string
    @ManyToOne(()=>DiamondEntity, { nullable: true })
    @JoinColumn({name:'DiamondID', referencedColumnName:'DiamondID'})
    Diamond: DiamondEntity
    //done
}