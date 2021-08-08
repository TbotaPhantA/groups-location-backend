import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { CreateGroupInputDto } from "../dto/create-group-input.dto";
import { Group } from "../groups.entity";
import { UsersGroups } from "../users_groups.entity";
import { REDIS_CLIENT } from "src/redis/redis.module";
import { Redis } from "ioredis";
import { RedisService } from "src/redis/redis.service";
import { CreateInviteLinkOutputDto } from "../dto/create-invite-link-output.dto";


@Injectable()
export class GroupsCreateService {
    
    constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>,
                @InjectRepository(UsersGroups) private readonly userGroupRepo: Repository<UsersGroups>,
                private readonly redisService: RedisService) {} 

    
    async createGroup(user: User, dto: CreateGroupInputDto) {

        const groupWithoutMembersDto = {
            name: dto.name,
            owner: user
        }
        const groupWithoutMembers = await this.groupRepository.save(groupWithoutMembersDto);

        const userGroup = await this.createUserGroup(user, groupWithoutMembers);

        const group = await this.groupRepository.findOne(groupWithoutMembers.uuid, {relations: ['owner', 'usersGroups']});
        return group; 
    }

    async createInviteLink(uuidOfGroup: string): Promise<CreateInviteLinkOutputDto> {
        const redisNewGroupInviteValue = await this.redisService.createGroupInvite(uuidOfGroup);
        const protocol = process.env.APPLICATION_PROTOCOL;
        const host = process.env.APPLICATION_HOST;
        const port = process.env.APPLICATION_PORT;
        const inviteLink = `${protocol}://${host}:${port}/groups/useInvite/${redisNewGroupInviteValue.groupUUID}/${redisNewGroupInviteValue.inviteKey}`; 
        return {
            inviteLink: inviteLink
        }
    }

    public async createUserGroup(user: User, group: Group) {
        return await this.userGroupRepo.save({
            user: user,
            group: group,
        })
    }
} 