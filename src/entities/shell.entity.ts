import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('shell')
export class ShellEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ShellID: number;
    @Column()
    ProductCost: number
    @Column()
    IsActive: number
    @Column()
    Weight: number
    @Column()
    JeweryTypeID: number
    @Column()
    MaterialJewelryID: number
   
}