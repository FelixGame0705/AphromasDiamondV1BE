import { IsPhoneNumber } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('diamond')
export class DiamondEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    DiamondID: number
    @Column()
    Name: string
    @Column()
    Cut: string
    @Column()
    Price: number
    @Column()
    Color: string
    @Column()
    WeightCarat: number
    @Column()
    PercentDepth: number
    @Column()
    LengthOnWidthRatio: number
    @Column()
    Description: string
    @Column()
    IsActive: boolean
    @Column()
    Fluorescene: boolean
    @Column()
    Clarity: string
    @Column()
    PercentTable: number
    @Column()
    Polish: string
    @Column()
    Symmetry: string
    @Column()
    ChargeRate: number
    @Column()
    JewelryID: number

}