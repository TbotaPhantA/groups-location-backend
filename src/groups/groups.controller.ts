import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { GetGroupOutput } from './dto/get-group-output.dto';

@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) {}

    @Get()
    @ApiOperation({summary: "Getting all the gropus"})
    @ApiResponse({
        status: 200, 
        description: 'All found users',
        type: [GetGroupOutput],
    })
    getUsers() {
        return this.groupsService.getGroups();
    }

    @Get(':id')
    @ApiOperation({summary: "Getting one group by its ID"})
    @ApiResponse({
        status: 200, 
        description: 'find user',
        type: GetGroupOutput,
    })
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.groupsService.getGroup(uuid);
    }
}
