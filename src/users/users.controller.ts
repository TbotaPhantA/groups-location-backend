import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { getUserOutput } from './dto/get-user-output.dto';

@ApiBearerAuth()
@ApiTags('/users')
@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @ApiResponse({
        status: 200, 
        description: 'All found users',
        type: [getUserOutput],
    })
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    @ApiResponse({
        status: 200, 
        description: 'find user',
        type: getUserOutput,
    })
    getUser(@Param() params: {id: string}) {
        return this.usersService.getUser(parseInt(params.id));
    }
}
