import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersGroups } from "./users_groups.entity";



@Entity()
export class Group {

    @ApiProperty({example: 'c37ac5df-a637-4663-aa4a-2731302caef2', description: 'UUID of the user'})
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ApiProperty({ example: 'ministerstvo kaifa', description: 'Name of the Group (not unique)' })
    @Column('varchar', {nullable: false, length: 30})
    name: string;

    @ApiProperty({ type: () => User, example: '{...owner information}', description: 'json data of the owner' })
    @ManyToOne(() => User, user => user.ownedGroups)
    owner!: User; // TypeOrm will generate column ownerId automatically, also I'll be able to use object owner immediately without worrying about extraction of owner by id... 

    @ApiProperty({example: '[{uuid:...}, {uuid: ...}...]', description: 'list of the information about group memebers'})
    @OneToMany(() => UsersGroups, usersGroups => usersGroups.group)
    usersGroups: UsersGroups[]; 

}