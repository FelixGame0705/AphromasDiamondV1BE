import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShellEntity } from "./shell.entity";

@Entity('MaterialJewelry')
export class MaterialJewelryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    MaterialID: number
    @Column({nullable:true})
    BuyPrice: number
    @Column({nullable:true})
    SellPrice: number
    @Column({type: "datetime"})
    UpdateTime: Date
    @Column()
    Name: string
    @OneToMany(()=>ShellEntity, shell=> shell.MarterialJewelrID)
    shells: ShellEntity[]
    //done
}