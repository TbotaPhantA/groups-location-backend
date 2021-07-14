import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "geojson";
import { UsersGroups } from "src/groups/users_groups.entity";

@Entity()
export class Mark {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('point')
    coordinates!: Point;

    @ManyToOne(() => UsersGroups, userGroup => userGroup.marks)
    userGroup!: UsersGroups;
}