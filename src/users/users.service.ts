import { HttpException, HttpStatus, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { GetUserOutputDto } from './dto/get-user-output.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async getAllUsers(): Promise<GetUserOutputDto[]> {
        return await this.userRepository.find({select: ['uuid', 'name', 'email']});
    }

    async getUserByUUID(userUuid: string): Promise<GetUserOutputDto> {
        const user = await this.userRepository.findOne(userUuid, {select: ['uuid', 'name', 'email']})
        if (!user) throw new HttpException(`There is no user with UUID = ${userUuid}`, HttpStatus.NOT_FOUND);
        return user
    }

    async createUser(dto: CreateUserInputDto): Promise<GetUserOutputDto>{
        // server won't crash if this Exception will be thrown, client will receive correct error message as reponse, because they throw HttpException()
        await this.assertCreateUserDtoDataIsCorrect(dto); 
        await this.assertUserInDtoHasUniqueEmail(dto);
        const {password, ...user} = await this.userRepository.save(dto);
        return user
    }

    private async assertCreateUserDtoDataIsCorrect(dto: CreateUserInputDto): Promise<void> {
        try {
            const dtoInstance = new CreateUserInputDto(dto.name, dto.email, dto.password); // we need instance for class-validator to work
            await validateOrReject(dtoInstance);
        } catch (errors) {
            const extractedValidationProblems = errors.map(err => Object.values(err.constraints)).reduce((acc, val) => acc.concat(val), []).join(', ') 
            throw new HttpException('Validation of input during user creation is failed: ' + extractedValidationProblems, HttpStatus.BAD_REQUEST)
        }
    }

    private async assertUserInDtoHasUniqueEmail(dto: CreateUserInputDto): Promise<void> {
        if (await this.userRepository.findOne({ email: dto.email })) throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }
    

}
