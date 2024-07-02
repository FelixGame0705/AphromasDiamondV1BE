import { text } from "stream/consumers";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsingImageEntity } from "./usingImage.entity";

@Entity('Image')
export class ImageEntity{
    @PrimaryGeneratedColumn()
    ImageID: number
    @Column()
    Name: string
    @Column({nullable: true})
    url: string
    @OneToMany(()=>UsingImageEntity, usingImage => usingImage.ImageID)
    usingImages: UsingImageEntity[]
}