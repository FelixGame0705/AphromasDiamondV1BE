import { IsPhoneNumber } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('account')
export class AccountsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    AccountID: number;
    @Column()
    Name:string;
    @Column()
    @IsPhoneNumber()
    PhoneNumber:string
    @Column()
    Username:string;
    @Column()
    Password:string;
    @Column()
    Role:string;
}