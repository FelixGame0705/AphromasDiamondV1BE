import { IsPhoneNumber } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity('account')
export class AccountsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    AccountID: number;
    @Column()
    Name:string;
    @Column()
    @IsPhoneNumber()
    PhoneNumber:string
    @Column({unique: true})
    Username:string;
    @Column()
    Password:string;
    @Column()
    Role:string;
}