import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { CreateGroupInputDto } from "../dto/create-group-input.dto";
import { Group } from "../groups.entity";
import { UsersGroups } from "../users_groups.entity";
import * as random from 'random-string-generator';
import { REDIS_CLIENT } from "src/redis/redis.module";
import { Redis } from "ioredis";
import { RedisService } from "src/redis/redis.service";


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

    async createInviteLink(uuidOfGroup: string) {
        const newGeneratedInviteKey: string = random(20);
        this.redisService.createGroupInvite();
        // await this.redisCacheManager.set(newGeneratedInviteKey, uuidOfGroup, {ttl: 86400})
        // redis.add(newGeneratedInviteKey: {uuid: uuidOfGroup}) pseudo code
    }

    private async createUserGroup(user: User, group: Group) {
        return await this.userGroupRepo.save({
            user: user,
            group: group,
        })
    }
} 