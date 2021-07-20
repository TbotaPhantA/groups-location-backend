import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { GetGroupOutput } from './dto/get-group-output.dto';
import { JwtGuard } from 'src/native-auth/jwt-auth.guard';
import { Request } from 'express';
import { GetAuthenticatedUser } from 'src/native-auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { CreateGroupInputDto } from './dto/create-group-input.dto';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) {}

    @Post('create')
    @UseGuards(JwtGuard)
    createGroup(@GetAuthenticatedUser() user: User, @Body() dto: CreateGroupInputDto) {
        return this.groupsService.createGroup(user, dto);
    }

    @Get()
    getUsers() {
        return this.groupsService.getGroups();
    }

    @Get(':id')
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.groupsService.getGroup(uuid);
    }
}
