import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column('varchar', {length: 1000, nullable: false})
    refreshToken: string; 

    @OneToOne(() => User, user => user.refreshToken)
    @JoinColumn()
    user: User;

}
