import { Column, PrimaryGeneratedColumn } from "typeorm";

export class SizeEntity{
    @PrimaryGeneratedColumn()
    SizeID: number
    @Column()
    Size: number
    @Column()
    UnitOfMeasure: string
}