import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { User } from './users.entity';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/dev/')
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/dev/:uuid')
  getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.usersService.getUserByUUID(uuid);
  }

  @Post('/dev/create')
  createUser(@Body() dto: CreateUserInputDto): Promise<User> {
    return this.usersService.createUser(dto);
  }
}
