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

    async updateAccessAndRefreshTokens(request: Request, response: Response): Promise<TokensOutputDto> {
        const refresh_token = request.cookies['refresh_token'];
        if (!refresh_token) throw new UnauthorizedException("No Token in cookies")
        const access_token = request.header('Authorization').split(' ')[1];
        if (!access_token) throw new UnauthorizedException("You're not authorized, no bearer token in the header's authroization field")
        const currentUserUUID = this.jwtService.decode(access_token)?.["uuid"];
        if (!currentUserUUID) throw new UnauthorizedException("There's not user UUID in the bearer token, It has to be there")  
        if (await !this.compareRefreshToken(currentUserUUID, refresh_token)) throw new UnauthorizedException("your refresh token isn't correct, either you logged in from another device or somebody else entered to your account")
        this.updateRefreshTokenInDBAndSetItInCookie(currentUserUUID, response);    
        const user = await this.usersService.getUserByUUID(currentUserUUID);
        return this.receiveAccessToken(user);
    }

    private async compareRefreshToken(uuid: string, token: string): Promise<boolean> {
        const { refresh_token } = await this.usersService.getUserByUUID(uuid);
        return token === refresh_token;
    }

    private async receiveAccessToken(user: User): Promise<TokensOutputDto> {
        const payload = {uuid: user.uuid, email: user.email, name: user.name};
        return {
            access_token: this.jwtService.sign(payload)
        }
    } 

    private async updateRefreshTokenInDBAndSetItInCookie(uuidOfUser: string, response: Response): Promise<void> {
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
