import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';
import { TokensOutputDto } from './dto/Tokens-output.dto';
import { NativeAuthService } from './native-auth.service';

@ApiTags('Native Authentication')
@Controller('native-auth')
export class NativeAuthController {

    constructor(private nativeAuthService: NativeAuthService) { }

    @Post('signup')
    @ApiOperation({ summary: "signup user with his email, name and password" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if reigstration is successful reponds with token with public information of created user",
        type: TokensOutputDto,
    })
    @UsePipes(new ValidationPipe())
    signUp(@Body() dto: CreateUserInputDto, @Res({ passthrough: true }) response: Response ): Promise<TokensOutputDto> {
        return this.nativeAuthService.signUp(dto, response);
    }

    @Post('signin')
    @ApiOperation({ summary: "signin user with email and password" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "if signing in is succeffsul, responds with token with public information of this user",
        type: TokensOutputDto,
    })
    @UsePipes(new ValidationPipe())
    signIn(@Body() dto: NAuthSignInInputDto, @Res({ passthrough: true }) response: Response ): Promise<TokensOutputDto> {
        return this.nativeAuthService.signIn(dto, response);
    }

}
