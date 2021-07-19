import { Group } from "src/groups/groups.entity";
import { UsersGroups } from "src/groups/users_groups.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar', nullable: false, length: 60, })
    name: string;

    @Column({type: 'varchar', nullable: false, length: 255, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 500})
    password: string;

    @Column({type: 'varchar', nullable: true, length: 1000})
    refresh_token: string;

    @OneToMany(() => Group, group => group.owner)
    ownedGroups!: Group[];

    @OneToMany(() => UsersGroups, usersGropus => usersGropus.user)
    usersGroups!: UsersGroups[];

}