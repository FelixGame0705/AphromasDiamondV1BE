import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SizeMatchShellEntity } from "./sizeMatchShell.entity";

@Entity('Size')
export class SizeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    SizeID: number
    @Column()
    SizeValue: number
    @Column()
    UnitOfMeasure: string
    @OneToMany(()=>SizeMatchShellEntity, sizeMatchShell=>sizeMatchShell.size)
    sizeMatchShell: SizeMatchShellEntity[]
}