import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {nullable: false, length: 30})
    name: string;

    @ManyToOne(() => User)
    @Column('varchar', {nullable: false})
    owner: User; // TypeOrm will generate column ownerId automatically, also I'll be able to use object owner immediately without worrying about extraction of owner by id... 

}