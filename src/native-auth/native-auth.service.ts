import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { TokensOutputDto } from './dto/Tokens-output.dto';
import * as random from 'random-string-generator';
import { Response } from 'express';

@Injectable()
export class NativeAuthService {

    constructor (private readonly jwtService: JwtService,
                 private readonly usersService: UsersService) {}

    async signUp(dto: CreateUserInputDto, response: Response): Promise<TokensOutputDto> {
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.createUser({...dto, password: hashedPassword});
        this.updateRefreshTokenInDBAndSetItInCookie(user.uuid, response);
        return this.receiveAccessToken(user);
    }

    async signIn(dto: NAuthSignInInputDto, response: Response): Promise<TokensOutputDto>  {
        const user = await this.receiveValidatedUser(dto);
        this.updateRefreshTokenInDBAndSetItInCookie(user.uuid, response);
        return await this.receiveAccessToken(user);
    }

    private async receiveAccessToken(user: User): Promise<TokensOutputDto> {
        const payload = {uuid: user.uuid, email: user.email, name: user.name};
        return {
            access_token: this.jwtService.sign(payload)
        }
    } 

    private async updateRefreshTokenInDBAndSetItInCookie(uuidOfUser: string, response: Response) {
        const newRefreshToken = random(999); 
        this.usersService.updateRefreshToken(uuidOfUser, newRefreshToken);
        response.cookie('refresh_token', newRefreshToken, { httpOnly: true });
    }

    private async receiveValidatedUser(dto: NAuthSignInInputDto): Promise<User>  {
        const failedToSignInError = new UnauthorizedException({ messsage: 'Incorrect email or the password' })  
        const candidate = await this.usersService.getUserByEmail(dto.email); 
        if (!candidate) throw failedToSignInError;
        const passwordsAreEqual = await bcrypt.compare(dto.password, candidate.password)
        if (!passwordsAreEqual) throw failedToSignInError;
        return candidate;
    }
}
