import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/users/users.entity';
import { Group } from '../groups.entity';
import { GroupsReadService } from '../services/groups-read.service';
import { GroupRoleType, ROLE_KEY } from '../group-role.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(
    private readonly groupsReadService: GroupsReadService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const uuidOfGroup = this.getUUIDOfGroupFromRequest(request);
    const group = await this.getGroupFromDBByUUID(uuidOfGroup);
    // put group entity to request, for @GetGroup param decorator in controller methods which use this guard
    request.group = group;

    const uuidOfCurrentUser = request.jwtPayload.uuid;
    const currentUser = await this.getUserFromDBByUUID(uuidOfCurrentUser);
    // put user entity to request, for @GetAuthorizedUser decorator in controller methods which use this guard
    request.user = currentUser;

    const role: GroupRoleType = this.reflector.get<GroupRoleType>(
      ROLE_KEY,
      context.getHandler(),
    );

    if (role === 'owner') {
      this.assertCurrentUserIsOwnerOfGroup(group, currentUser);
      return true;
    }

    if (role === 'member') {
      this.assertCurrentUserIsMemberOfGroup(group, currentUser);
      return true;
    }

    if (role === 'not member') {
      this.assertCurrentUserIsNotMemberOfGroup(group, currentUser);
      return true;
    }

    throw new HttpException(
      'No role decorator on this endpoint, need to add Role Decorator to controller method, for GroupGuard to work',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private getUUIDOfGroupFromRequest(request: Request): string {
    const uuidOfGroup = request.params?.uuid || request.params?.groupUUID;
    if (!uuidOfGroup)
      throw new HttpException(
        'There is no UUID of group users in params',
        HttpStatus.BAD_REQUEST,
      );

    return uuidOfGroup;
  }

  private async getGroupFromDBByUUID(uuidOfGroup: string) {
    const group = await this.groupsReadService.getOneGroupByUUID(uuidOfGroup);
    if (!group)
      throw new HttpException(
        'There is not Group with this UUID',
        HttpStatus.BAD_REQUEST,
      );

    return group;
  }

  private async getUserFromDBByUUID(uuidOfUser) {
    const user = await this.usersService.getUserByUUID(uuidOfUser);

    return user;
  }

  private assertCurrentUserIsOwnerOfGroup(
    group: Group,
    currentUser: User,
  ): void {
    const isCurrentUserAnOwner = currentUser.uuid === group.owner.uuid;
    if (!isCurrentUserAnOwner)
      throw new HttpException(
        'Current user is not owner of this group',
        HttpStatus.FORBIDDEN,
      );
  }

  private assertCurrentUserIsMemberOfGroup(
    group: Group,
    currentUser: User,
  ): void {
    const coincidence = group.usersGroups.find((groupUserGroup) => {
      return !!currentUser.usersGroups.find(
        (userUserGroup) => groupUserGroup.uuid === userUserGroup.uuid,
      );
    });
    if (!coincidence)
      throw new HttpException(
        'Current user is not owner of this group',
        HttpStatus.FORBIDDEN,
      );
  }

  private assertCurrentUserIsNotMemberOfGroup(group: Group, currentUser: User) {
    const coincidence = group.usersGroups.find((groupUserGroup) => {
      return !!currentUser.usersGroups.find(
        (userUserGroup) => groupUserGroup.uuid === userUserGroup.uuid,
      );
    });
    if (coincidence)
      throw new HttpException(
        'Current user is already member of the group',
        HttpStatus.FORBIDDEN,
      );
  }
}
