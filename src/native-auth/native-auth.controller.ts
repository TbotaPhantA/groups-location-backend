import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { CreateUserOutputDto } from 'src/users/dto/create-user-output.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';

@ApiTags('Native Authentication')
@Controller('native-auth')
export class NativeAuthController {

    @Post('signup')
    @ApiOperation({ summary: "signup user with his email, name and password" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if reigstration is successful reponds with public information of created user",
        type: CreateUserOutputDto,
    })
    @UsePipes(new ValidationPipe())
    signUp(@Body() dto: CreateUserInputDto) {

    }

    @Post('signin')
    @ApiOperation({ summary: "signin user with email and password" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if signing in is succeffsul, responds with public information of this user",
        type: CreateUserOutputDto,
    })
    @UsePipes(new ValidationPipe())
    signIn(@Body() dto: NAuthSignInInputDto) {

    }

}
