import { User } from "src/users/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./groups.entity";


@Entity()
export class UsersGroups {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.usersGroups) 
    user!: User;    

    @ManyToOne(() => Group, group => group.usersGroups) 
    group!: Group;

}