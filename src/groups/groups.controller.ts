import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { GetGroupOutput } from './dto/get-group-output.dto';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) {}

    @Get()
    getUsers() {
        return this.groupsService.getGroups();
    }

    @Get(':id')
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.groupsService.getGroup(uuid);
    }
}
