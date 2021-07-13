import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false, length: 60, })
    name: string;

    @Column({type: 'varchar', nullable: true, default: 'Happy 👋😀',})
    status: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 400})
    password: string;

}