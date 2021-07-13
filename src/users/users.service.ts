import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    async getUsers() {
        const users = await [
            {id: 1, name: 'tapor', email: 'tapor@mail.com'},
            {id: 2, name: 'zabor', email: 'zabor@mail.com'},
        ];
        return users
    }

    async getUser(userId: number) {
        const users = [
            {id: 1, name: 'tapor', email: 'tapor@mail.com'},
            {id: 2, name: 'zabor', email: 'zabor@mail.com'},
        ];
        return users.filter(user => user.id === userId)
    }


}
