import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JewelryTypeEntity } from "./jewelryType.entity";
import { MaterialJewelryEntity } from "./marterialJewelry.entity";
import { DiamondEntity } from "./diamond.entity";
import { FeedbackEntity } from "./feedback.entity";
import { SizeMatchShellEntity } from "./sizeMatchShell.entity";
import { OrderLineEntity } from "./orderLine.entity";

@Entity('Shell')
export class ShellEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ShellID: number
    @Column()
    ProductionCost: number
    @Column()
    IsActive: boolean
    @Column()
    Weight: number
    @Column({type:"datetime"})
    UpdateTime: Date
    @Column({nullable: true})
    DiamondShape: string
    @Column({default: 100})
    ChargeRate: number
    @Column({nullable: true})
    JewelryTypeID: number
    @Column({nullable: true})
    MarterialJewelrID: number
    @ManyToOne(()=>JewelryTypeEntity, { nullable: true })
    @JoinColumn({name:'JewelryTypeID', referencedColumnName:'JewelryTypeID'})
    jewelryType: JewelryTypeEntity
    @ManyToOne(()=>MaterialJewelryEntity, { nullable: true })
    @JoinColumn({name:'MaterialID', referencedColumnName:'MaterialID'})
    materialJewelry:MaterialJewelryEntity
    @OneToMany(()=>DiamondEntity, diamond => diamond.shell)
    diamond: DiamondEntity[]
    @OneToMany(()=>FeedbackEntity, feedback => feedback.shell)
    feedback: FeedbackEntity[]
    @OneToMany(()=>SizeMatchShellEntity, sizeMatchShell => sizeMatchShell.shell)
    sizeMatchShellEntity: SizeMatchShellEntity[]
    @OneToMany(()=> OrderLineEntity, orderLine=>orderLine.shell)
    orderLine: OrderLineEntity[]
    //done
}