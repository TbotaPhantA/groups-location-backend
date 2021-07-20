import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersGroups } from "./users_groups.entity";



@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column('varchar', {nullable: false, length: 30})
    name: string;

    @ManyToOne(() => User, user => user.ownedGroups)
    owner!: User; // TypeOrm will generate column ownerId automatically, also I'll be able to use object owner immediately without worrying about extraction of owner by id... 

    @OneToMany(() => UsersGroups, usersGroups => usersGroups.group)
    usersGroups: UsersGroups[] = []; 

}