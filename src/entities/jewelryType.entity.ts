import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShellEntity } from "./shell.entity";

@Entity('JewelryType')
export class JewelryTypeEntity{
    @PrimaryGeneratedColumn()
    JewelryTypeID: number
    @Column()
    Name: string
    @OneToMany(()=>ShellEntity, shell => shell.JewelryTypeID)
    shells: ShellEntity[]
    //done
}