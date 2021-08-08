import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Group } from "../groups.entity";
import { UsersGroups } from "../users_groups.entity";


@Injectable()
export class GroupsDeleteService {

    constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>,
                @InjectRepository(UsersGroups) private readonly userGroupRepo: Repository<UsersGroups>,
                private readonly usersService: UsersService) {} 


    async deleteGroup(group: Group): Promise<Group> {
        return this.groupRepository.remove(group);
    } 

    async kickGroupMember(userUUID: string, group: Group): Promise<User> {
        const user = await this.usersService.getUserByUUID(userUUID);

        const userGroup = await this.userGroupRepo.findOne({where: {user: user, group: group}});
        if (!userGroup) throw new HttpException("Either group doesn't exist or user is not member of this group", HttpStatus.BAD_REQUEST)

        this.userGroupRepo.remove(userGroup);

        return user;
    }

}