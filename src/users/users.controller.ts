import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUserOutputDto } from './dto/get-user-output.dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';

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
        type: [GetUserOutputDto],
    })
    getUsers(): Promise<GetUserOutputDto[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':uuid')
    @ApiOperation({summary: "Getting one user by his ID"})
    @ApiResponse({
        status: 200, 
        description: 'find user',
        type: GetUserOutputDto,
    })
    getUser(@Param('uuid') uuid: string): Promise<GetUserOutputDto> {
        return this.usersService.getUserByUUID(uuid);
    }

    @Post('/create')
    @ApiOperation({ summary: "creating new user in the DB"})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Validation and creation of new user in the DB",
        type: GetUserOutputDto,
    })
    createUser(@Body() dto: CreateUserInputDto): Promise<GetUserOutputDto> {
        return this.usersService.createUser(dto);
    }
}
