import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { getUserOutput } from './dto/get-user-output.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: "Getting all the users"})
    @ApiResponse({
        status: 200, 
        description: 'All found users',
        type: [getUserOutput],
    })
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    @ApiOperation({summary: "Getting one user by his ID"})
    @ApiResponse({
        status: 200, 
        description: 'find user',
        type: getUserOutput,
    })
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.getUser(uuid);
    }
}
