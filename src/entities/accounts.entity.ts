import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('accounts')
export class AccountsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username:string;
    @Column()
    password:string;
    @Column()
    role:string;
}