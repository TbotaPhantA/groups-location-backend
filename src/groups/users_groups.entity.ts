import { User } from "src/users/users.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./groups.entity";
import { Location } from '../locations/locations.entity';


@Entity()
export class UsersGroups {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.usersGroups) 
    user!: User;    

    @ManyToOne(() => Group, group => group.usersGroups) 
    group!: Group;

    @OneToOne(() => Location)
    @JoinColumn()
    location!: Location;

}