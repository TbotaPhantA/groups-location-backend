import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
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
    createGroup(@GetAuthenticatedUser() user: User, @Body() dto: CreateGroupInputDto) {
        return this.groupsCreateService.createGroup(user, dto);
    }

    @ApiOperation({ summary: "Get List of ALl groups" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "responds with list of all existing groups",
        type: [Group],
    })
    @Get()
    getAllGroups() {
        return this.groupsReadService.getAllGroups();
    }

    @ApiOperation({ summary: "Get One Group by its UUID" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if group with this uuid is exist, responds with information about this group",
        type: Group,
    })
    @Get(':uuid')
    getOneGroupByUUID(@Param('uuid') uuid: string) {
        return this.groupsReadService.getOneGroupByUUID(uuid);
    }
}
