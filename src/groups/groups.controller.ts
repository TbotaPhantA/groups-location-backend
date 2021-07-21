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
import { GroupOwnerGuard } from './guards/group-owner.guard';
import { GetGroup } from 'src/native-auth/get-group.decorator';


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
    @UseGuards(JwtGuard, GroupOwnerGuard)
    async updateGroupName(@Param('uuid') uuid: string, @Body() dto: UpdateGroupNameInputDto): Promise<void> {
        await this.groupsUpdateService.updateGroupName(uuid, dto)
    }

    @Delete(':uuid')
    @ApiOperation({ summary: "Deletes the Group by its uuid" })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "If group name was updated successfully, 204 status code with be returned, with no any content",
    })
    @UseGuards(JwtGuard,  GroupOwnerGuard)
    async deleteGroup(@GetGroup() group: Group): Promise<Group> {
        return this.groupsDeleteService.deleteGroup(group);
    }
}
