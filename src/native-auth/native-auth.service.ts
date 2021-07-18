import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
import { NAuthSignInInputDto } from './dto/NAuth-signin-input.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { TokensOutputDto } from './dto/Tokens-output.dto';

@Injectable()
export class NativeAuthService {

    constructor (private readonly jwtService: JwtService,
                 private readonly usersService: UsersService) {}

    async signUp(dto: CreateUserInputDto): Promise<TokensOutputDto> {
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.createUser({...dto, password: hashedPassword});
        return this.receiveGeneratedToken(user);
    }

    async signIn(dto: NAuthSignInInputDto): Promise<TokensOutputDto>  {
        const user = await this.receiveValidatedUser(dto);
        return await this.receiveGeneratedToken(user);
    }

    private async receiveGeneratedToken(user: User): Promise<TokensOutputDto> {
        const payload = {uuid: user.uuid, email: user.email, name: user.name};
        return {
            token: this.jwtService.sign(payload)
        }
    } 

    private async receiveValidatedUser(dto: NAuthSignInInputDto): Promise<User>  {
        const failedToSignInError = new UnauthorizedException({ messsage: 'Incorrect email or the password' })  
        try {
            const candidate = await this.usersService.getUserByEmail(dto.email); 
            const passwordsAreEqual = await bcrypt.compare(dto.password, candidate.password)
            if (candidate && passwordsAreEqual) return candidate;
            throw failedToSignInError;
        } catch {
            throw failedToSignInError;
        }
    }
}
