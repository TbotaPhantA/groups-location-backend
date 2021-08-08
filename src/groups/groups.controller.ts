import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/native-auth/jwt-auth.guard';
import { GetAuthenticatedUser } from 'src/native-auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { CreateGroupInputDto } from './dto/create-group-input.dto';
import { GroupsCreateService } from './services/groups-create.service';
import { GroupsReadService } from './services/groups-read.service';
import { GroupsUpdateService } from './services/groups-update.service';
import { GroupsDeleteService } from './services/groups-delete.service';
import { Group } from './groups.entity';
import { UpdateGroupNameInputDto } from './dto/update-group-name-input.dto';
import { GroupGuard } from './guards/group.guard';
import { GetGroup } from 'src/native-auth/get-group.decorator';
import { GroupRole } from './group-role.decorator';
import { CreateInviteLinkOutputDto } from './dto/create-invite-link-output.dto';


@ApiTags('Groups')
@Controller('groups')
export class GroupsController {

    constructor(private groupsCreateService: GroupsCreateService,
                private groupsReadService: GroupsReadService,
                private groupsUpdateService: GroupsUpdateService,
                private groupsDeleteService: GroupsDeleteService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: "Create Group: *authentication required*" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "If group created successfuly responds with group information",
        type: Group,
    })
    @Post('create')
    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    createGroup(@GetAuthenticatedUser() user: User, @Body() dto: CreateGroupInputDto): Promise<Group> {
        return this.groupsCreateService.createGroup(user, dto);
    }

    @ApiOperation({ summary: "Get List of ALl groups" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "responds with list of all existing groups",
        type: [Group],
    })
    @Get()
    getAllGroups(): Promise<Group[]> {
        return this.groupsReadService.getAllGroups();
    }

    @ApiOperation({ summary: "Get One Group by its UUID" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if group with this uuid is exist, responds with information about this group",
        type: Group,
    })
    @Get(':uuid')
    getOneGroupByUUID(@Param('uuid') uuid: string): Promise<Group> {
        return this.groupsReadService.getOneGroupByUUID(uuid);
    }

    @Put(':uuid/change-name')
    @ApiOperation({ summary: "Updates the name of the Group" })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "If group name was updated successfully, 204 status code with be returned, with no any content",
    })
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @GroupRole('owner')
    @UseGuards(JwtGuard, GroupGuard)
    async updateGroupName(@Param('uuid') uuid: string, @Body() dto: UpdateGroupNameInputDto): Promise<void> {
        await this.groupsUpdateService.updateGroupName(uuid, dto)
    }

    @Delete(':uuid')
    @ApiOperation({ summary: "Deletes the Group by its uuid" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "If group name was updated successfully, 204 status code with be returned, with no any content",
    })
    @ApiBearerAuth()
    @GroupRole('owner')
    @UseGuards(JwtGuard,  GroupGuard)
    async deleteGroup(@GetGroup() group: Group): Promise<Group> {
        return this.groupsDeleteService.deleteGroup(group);
    }

    @Post('/:uuid/create-invite')
    @ApiOperation({ summary: "Creates a disposable invite link" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "If currenter user is the member of the group creates disposalbe invitation link",
        type: CreateInviteLinkOutputDto,
    })
    @ApiBearerAuth()
    @GroupRole('member')
    @UseGuards(JwtGuard, GroupGuard)
    createInviteLink(@Param('uuid') uuid: string): Promise<CreateInviteLinkOutputDto> {
        return this.groupsCreateService.createInviteLink(uuid);
    }

    @Put('useInvite/:groupUUID/:inviteKey')
    @ApiOperation({ summary: "If inviteKey is valid, adds current user to group members" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "If inviteLink is valid, adds current user to group members",
    })
    @ApiBearerAuth()
    @GroupRole('not member')
    @UseGuards(JwtGuard, GroupGuard)
    useInviteLink(@Param('inviteKey') inviteKey: string, @GetAuthenticatedUser() user: User): Promise<void> {
       return this.groupsUpdateService.useInviteLink(inviteKey, user);
    }

    @Delete('/kick-member/:userUUID/:groupUUID')
    @ApiOperation({ summary: "Kicks the member of the group" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Kicks the member fo the group",
        type: User,
    })
    @ApiBearerAuth()
    @GroupRole('owner')
    @UseGuards(JwtGuard, GroupGuard)
    kickMember(@Param('userUUID') userUUID: string, @GetGroup() group: Group): Promise<User> {
        return this.groupsDeleteService.kickGroupMember(userUUID, group);
    }
}
