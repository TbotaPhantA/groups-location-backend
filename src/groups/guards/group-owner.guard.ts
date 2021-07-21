import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { User } from "src/users/users.entity";
import { Group } from "../groups.entity";
import { GroupsReadService } from '../services/groups-read.service';


@Injectable()
export class GroupOwnerGuard implements CanActivate {

    constructor(private readonly groupsReadService: GroupsReadService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()

        const uuidOfGroup = this.getUUIDOfGroupFromRequest(request);

        const group = await this.getGroupFromDBByUUID(uuidOfGroup);
        // put group entity to request, for @GetGroup param decorator in controller methods which use this guard same thing is in GroupMemberGruard
        request.group = group;
        
        const currenterUser = this.getCurrentUserFromRequest(request)

        this.assertCurrentUserIsOwnerOfGroup(group, currenterUser);

        return true;
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

    private assertCurrentUserIsOwnerOfGroup(group: Group, currentUser: User) {
        const isCurrentUserAnOwner = currentUser.uuid === group.owner.uuid;
        if (!isCurrentUserAnOwner) throw new HttpException("Current user is not owner of this group, therefore changing the name is forbitten", HttpStatus.FORBIDDEN);
    }
}
