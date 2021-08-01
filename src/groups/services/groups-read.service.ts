import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "../groups.entity";
import { UsersGroups } from "../users_groups.entity";


@Injectable()
export class GroupsReadService {

    constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>,
                @InjectRepository(UsersGroups) private readonly userGroupRepo: Repository<UsersGroups>) {} 

    async getAllGroups() {
        const allGroups = await this.groupRepository.find({relations: ['owner', 'usersGroups'] })
        return allGroups.map(group => this.clearGroupFromOwnerPassword(group));
    }

    async getOneGroupByUUID(uuid: string): Promise<Group> {
        try {
            const group = await this.groupRepository.findOne(uuid, {relations: ['owner', 'usersGroups']});  
            return this.clearGroupFromOwnerPassword(group);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    private clearGroupFromOwnerPassword(group: Group): Group {
        delete group.owner.password;
        return group;
    }
}