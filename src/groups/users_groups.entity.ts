import { User } from "src/users/users.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./groups.entity";
import { Location } from '../locations/locations.entity';
import { Mark } from "src/marks/marks.entity";


@Entity()
export class UsersGroups {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => User, user => user.usersGroups, {onDelete: 'CASCADE'}) 
    user!: User;    

    @ManyToOne(() => Group, group => group.usersGroups, {onDelete: 'CASCADE'}) 
    group!: Group;

    @OneToOne(() => Location)
    @JoinColumn()
    location: Location;

    @OneToMany(() => Mark, mark => mark.userGroup)
    marks: Mark[];

}