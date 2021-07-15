import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { getUserOutput } from './dto/get-user-output.dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { CreateUserOutputDto } from './dto/create-user-output.dto';

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

    @Post('/create')
    @ApiOperation({ summary: "creating new user in the DB"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Validation and creation of new user in the DB",
        type: CreateUserOutputDto,
    })
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto: CreateUserInputDto) {
        return this.usersService.createUser(dto);
    }
}
