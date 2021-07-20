import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { GroupsReadService } from '../services/groups-read.service';


@Injectable()
export class GroupOwnerGuard implements CanActivate {

    constructor(private readonly groupsReadService: GroupsReadService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const uuidOfGroup = request.params.uuid

        const { owner } = await this.groupsReadService.getOneGroupByUUID(uuidOfGroup);
        
        const currenterUser = request?.user
        if (!currenterUser) throw new Error('JwtGuard has to be above the GroupOwnerGuard');

        const isCurrentUserAnOwner = currenterUser.uuid === owner.uuid; 
        if (!isCurrentUserAnOwner) throw new HttpException("Current user is not owner of this group, therefore changing the name is forbitten", HttpStatus.FORBIDDEN);

        return true;
    }

}