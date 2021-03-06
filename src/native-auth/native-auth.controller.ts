import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';
import { TokensOutputDto } from './dto/Tokens-output.dto';
import { NativeAuthService } from './native-auth.service';

@ApiTags('Native Authentication')
@Controller('native-auth')
export class NativeAuthController {
  constructor(private nativeAuthService: NativeAuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'signup user with his email, name and password' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'if reigstration is successful reponds with token with public information of created user',
    type: TokensOutputDto,
  })
  @UsePipes(new ValidationPipe())
  signUp(
    @Body() dto: CreateUserInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokensOutputDto> {
    return this.nativeAuthService.signUp(dto, response);
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin user with email and password' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'if signing in is succeffsul, responds with token with public information of this user',
    type: TokensOutputDto,
  })
  @UsePipes(new ValidationPipe())
  signIn(
    @Body() dto: NAuthSignInInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokensOutputDto> {
    return this.nativeAuthService.signIn(dto, response);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'updates refresh_token in httponly cookie, and returns fresh access_token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'if update of the tokens is successful responds with fresh access_token',
    type: TokensOutputDto,
  })
  @Put('update-tokens')
  updateAccessAndRefreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokensOutputDto> {
    return this.nativeAuthService.updateAccessAndRefreshTokens(
      request,
      response,
    );
  }
}
