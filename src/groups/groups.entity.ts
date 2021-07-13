import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {nullable: false, length: 30})
    name: string;

    @Column('varchar', {nullable: false})
    ownerId: string

}