import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { User } from "src/users/users.entity";
import { Group } from "../groups.entity";
import { GroupsReadService } from '../services/groups-read.service';
import { GroupRoleType, ROLE_KEY } from '../group-role.decorator'
import { UsersGroups } from "../users_groups.entity";


@Injectable()
export class GroupGuard implements CanActivate {

    constructor(private readonly groupsReadService: GroupsReadService,
                private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()
        const uuidOfGroup = this.getUUIDOfGroupFromRequest(request);

        const group = await this.getGroupFromDBByUUID(uuidOfGroup);
        // put group entity to request, for @GetGroup param decorator in controller methods which use this guard
        request.group = group;
        
        const currenterUser = this.getCurrentUserFromRequest(request)

        const role: GroupRoleType = this.reflector.get<GroupRoleType>(ROLE_KEY, context.getHandler())

        if (role === 'owner') {
            this.assertCurrentUserIsOwnerOfGroup(group, currenterUser); 
            return true;
        } 
        
        if (role === 'member') {
            this.assertCurrentUserIsMemberOfGroup(group, currenterUser);
            return true;
        }

        throw new HttpException('No role decorator on this endpoint, need to add Role Decorator to controller method, for GroupGuard to work', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    private getUUIDOfGroupFromRequest(request: Request) {

        const uuidOfGroup = request.params?.uuid;
        if (!uuidOfGroup) throw new HttpException("There is no UUID of group users in params", HttpStatus.BAD_REQUEST); 

        return uuidOfGroup;
    }

    private async getGroupFromDBByUUID(uuidOfGroup: string) {

        const group = await this.groupsReadService.getOneGroupByUUID(uuidOfGroup);
        if (!group) throw new HttpException("There is not Group with this UUID", HttpStatus.BAD_REQUEST);

        return group;
    }

    private getCurrentUserFromRequest(request) {

        const currUser = request.user;
        if (!currUser) throw new HttpException("There is not user in request, probably you didn't apply JwtGuard, or applied it after This GroupOwnerGuard", HttpStatus.INTERNAL_SERVER_ERROR)

        return currUser;
    }

    private assertCurrentUserIsOwnerOfGroup(group: Group, currentUser: User): void {
        const isCurrentUserAnOwner = currentUser.uuid === group.owner.uuid;
        if (!isCurrentUserAnOwner) throw new HttpException("Current user is not owner of this group", HttpStatus.FORBIDDEN);
    }
    
    private assertCurrentUserIsMemberOfGroup(group: Group, currentUser: User): void {
        const users_groups: UsersGroups[] = group.usersGroups
        const userWithSameUUID = users_groups.find((user_group) => user_group.uuid === currentUser.uuid)
        if (!userWithSameUUID) throw new HttpException("Current user is not member of this group", HttpStatus.FORBIDDEN);
    }
}
