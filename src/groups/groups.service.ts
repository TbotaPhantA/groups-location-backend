import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateGroupInputDto } from './dto/create-group-input.dto';
import { Group } from './groups.entity';
import { UsersGroups } from './users_groups.entity';

@Injectable()
export class GroupsService {

    constructor(private readonly jwtService: JwtService,
                @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
                @InjectRepository(UsersGroups) private readonly userGroupRepo: Repository<UsersGroups>) {} 

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

    async getGroups() {
        const groups = await [
            {id: 'sadfasdf', name: 'zaborGroup', ownerId: 'lkjlk23j42l34'},
            {id: 'odsfidfogi', name: 'taporGroup', ownerId: 'o2oookj2okjokj'},
        ];
        return groups
    }

    async getGroup(groupUuid: string) {
        const groups = await [
            {id: 'sadfasdf', name: 'zaborGroup', ownerId: 'lkjlk23j42l34'},
            {id: 'odsfidfogi', name: 'taporGroup', ownerId: 'o2oookj2okjokj'},
        ];
        return groups.filter(group => group.id === groupUuid)[0]
    }

    async createUserGroup(user: User, group: Group) {
        return await this.userGroupRepo.save({
            user: user,
            group: group,
        })
    }
}
