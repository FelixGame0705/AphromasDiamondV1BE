import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "./size.entity";
import { ShellEntity } from "./shell.entity";

@Entity('SizeMatchShell')
export class SizeMatchShellEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    SizeMatchShellID: number
    @Column()
    SizeID: number
    @Column()
    ShellID: number
    @ManyToOne(()=> SizeEntity, {nullable:true})
    @JoinColumn({name:'SizeID', referencedColumnName:'SizeID'})
    size: SizeEntity
    @ManyToOne(()=>ShellEntity, {nullable:true})
    @JoinColumn({name: 'ShellID', referencedColumnName:'ShellID'})
    shell: ShellEntity
}