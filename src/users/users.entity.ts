import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';



@Entity()
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column({type: 'varchar', nullable: false, length: 60, })
    name: string;

    @Column({type: 'varchar', nullable: true, default: 'Happy 👋😀',})
    status: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 400})
    password: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4() 
    }

}