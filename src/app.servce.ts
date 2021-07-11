import { Injectable } from "@nestjs/common";



@Injectable()
export class AppService {
    getUsers() {
        const user = [{id: 1, name: 'Tapor'}]
        return user;
    }
}