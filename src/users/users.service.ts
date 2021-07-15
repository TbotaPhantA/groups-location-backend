import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';

@Injectable()
export class UsersService {

    async getUsers() {
        const users = await [
            {id: 1, name: 'tapor', email: 'tapor@mail.com'},
            {id: 2, name: 'zabor', email: 'zabor@mail.com'},
        ];
        return users
    }

    async getUser(userUuid: string) {
        const users = [
            {id: '1', name: 'tapor', email: 'tapor@mail.com'},
            {id: '2', name: 'zabor', email: 'zabor@mail.com'},
        ];
        return users.filter(user => user.id === userUuid)
    }

    async createUser(dto: CreateUserInputDto) {
        return {
            name: 'rashid',
            email: 'rashid@gmail.com',
        }
    }


}
