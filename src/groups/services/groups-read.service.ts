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
        return await this.groupRepository.find({relations: ['owner', 'usersGroups']});
    }

    async getOneGroupByUUID(uuid: string) {
        try {
            return await this.groupRepository.findOne(uuid, {relations: ['owner', 'usersGroups']});  
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }
}