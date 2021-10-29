import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { User } from 'src/users/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateGroupNameInputDto } from '../dto/update-group-name-input.dto';
import { Group } from '../groups.entity';
import { UsersGroups } from '../users_groups.entity';
import { GroupsCreateService } from './groups-create.service';
import { GroupsReadService } from './groups-read.service';

@Injectable()
export class GroupsUpdateService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(UsersGroups)
    private readonly userGroupRepo: Repository<UsersGroups>,
    private readonly groupsCreateService: GroupsCreateService,
    private readonly groupsReadService: GroupsReadService,
    private readonly redisService: RedisService,
  ) {}

  async updateGroupName(
    uuidOfGroup,
    dto: UpdateGroupNameInputDto,
  ): Promise<void> {
    await this.groupRepository.update(
      { uuid: uuidOfGroup },
      { name: dto.name },
    );
  }

  async useInviteLink(inviteKey: string, newMember: User): Promise<void> {
    const { groupUUID } = await this.redisService.disposeInvite(inviteKey);
    const group = await this.groupsReadService.getOneGroupByUUID(groupUUID);
    await this.groupsCreateService.createUserGroup(newMember, group);
  }
}
