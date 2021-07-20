import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { UpdateGroupNameInputDto } from "../dto/update-group-name-input.dto";
import { Group } from "../groups.entity";
import { UsersGroups } from "../users_groups.entity";
import { GroupsReadService } from "./groups-read.service";


@Injectable()
export class GroupsUpdateService {

    constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>,
                @InjectRepository(UsersGroups) private readonly userGroupRepo: Repository<UsersGroups>) {} 

    async updateGroupName(uuidOfGroup, dto: UpdateGroupNameInputDto): Promise<void> {
        await this.groupRepository.update({uuid: uuidOfGroup}, {name: dto.name});
    }
}