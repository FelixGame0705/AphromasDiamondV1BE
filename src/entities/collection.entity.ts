import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DiamondEntity } from "./diamond.entity";
import { ProductEntity } from "./products.entity";

@Entity('Collection')
export class CollectionEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    CollectionID: number
    @Column({nullable: true})
    CollectionName: string
    @Column({nullable: true})
    Description: string
    @Column({nullable: true})
    DebutTime: Date
    // @OneToMany(()=>DiamondEntity, diamond=>diamond.collection)
    // diamond: DiamondEntity[]
    // @OneToMany(()=>ProductEntity, product=>product.collection)
    // product: ProductEntity[]
    //done
}