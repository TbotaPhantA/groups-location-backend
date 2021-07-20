import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { TokensOutputDto } from './dto/Tokens-output.dto';
import * as random from 'random-string-generator';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh_tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NativeAuthService {

    constructor (private readonly jwtService: JwtService,
                 private readonly usersService: UsersService,
                @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>
                 ) {}

    async signUp(dto: CreateUserInputDto, response: Response): Promise<TokensOutputDto> {

        const hashedPassword = await bcrypt.hash(dto.password, 5);

        const user = await this.usersService.createUser({...dto, password: hashedPassword});

        await this.createOrUpdateRefreshTokenInDBAndSetItInCookie(user, response);
        return this.receiveAccessToken(user);
    }

    async signIn(dto: NAuthSignInInputDto, response: Response): Promise<TokensOutputDto>  {
        const user = await this.receiveValidatedUser(dto);

        await this.createOrUpdateRefreshTokenInDBAndSetItInCookie(user, response);
        return this.receiveAccessToken(user);
    }

    async updateAccessAndRefreshTokens(request: Request, response: Response): Promise<TokensOutputDto> {

        const refreshToken = request.cookies['refresh_token'];
        if (!refreshToken) throw new UnauthorizedException("No Token in cookies")

        const user = await this.receiveUserIfTokensAreEqual(refreshToken);

        await this.createOrUpdateRefreshTokenInDBAndSetItInCookie(user, response);    
        return this.receiveAccessToken(user);
    }

    private async createOrUpdateRefreshTokenInDBAndSetItInCookie(user: User, response: Response): Promise<void> {

        const newRefreshToken: string = random(100); 

        if (await this.refreshTokenRepo.findOne({user: user})) {
            await this.refreshTokenRepo.update({ user: user }, { refreshToken: newRefreshToken })
        } else {
            await this.refreshTokenRepo.save({ refreshToken: newRefreshToken, user: user })
        }

        response.cookie('refresh_token', newRefreshToken, { httpOnly: true });

    }

    private async compareRefreshToken(user: User, token: string): Promise<boolean> {
        const { refreshToken } = await this.refreshTokenRepo.findOne({user: user})
        return token === refreshToken;
    }

    private receiveAccessToken(user: User): TokensOutputDto {
        const payload = {uuid: user.uuid, email: user.email, name: user.name};
        return {
            access_token: this.jwtService.sign(payload)
        }
    } 

    private async receiveValidatedUser(dto: NAuthSignInInputDto): Promise<User>  {

        const failedToSignInError = new UnauthorizedException({ messsage: 'Incorrect email or the password' })  

        const candidate = await this.usersService.getUserByEmail(dto.email); 
        if (!candidate) throw failedToSignInError;

        const passwordsAreEqual = await bcrypt.compare(dto.password, candidate.password)
        if (!passwordsAreEqual) throw failedToSignInError;

        return candidate;
    }
    
    private async receiveUserIfTokensAreEqual(refreshToken: string): Promise<User> {

        const { user } = await this.refreshTokenRepo.findOne({ where: {refreshToken: refreshToken}, relations: ['user']}) || { user: undefined }; 
        if (!user) throw new UnauthorizedException("No user! Your refresh token isn't correct, either you logged in from another device or somebody else entered to your account")

        const areTokensEqual = await this.compareRefreshToken(user, refreshToken);
        if (!areTokensEqual) {
            throw new UnauthorizedException("Not Equals! Your refresh token isn't correct, either you logged in from another device or somebody else entered to your account")
        }

        return user;
    }
}
