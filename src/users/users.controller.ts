import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { User } from './users.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/dev/')
    @ApiOperation({summary: "Getting all the users"})
    @ApiResponse({
        status: 200, 
        description: 'All found users',
        type: [User],
    })
    getUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get('/dev/:uuid')
    @ApiOperation({summary: "Getting one user by his ID"})
    @ApiResponse({
        status: 200, 
        description: 'find user',
        type: User,
    })
    getUser(@Param('uuid') uuid: string): Promise<User> {
        return this.usersService.getUserByUUID(uuid);
    }

    @Post('/dev/create')
    @ApiOperation({ summary: "creating new user in the DB"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Validation and creation of new user in the DB",
        type: User,
    })
    createUser(@Body() dto: CreateUserInputDto): Promise<User> {
        return this.usersService.createUser(dto);
    }
}
