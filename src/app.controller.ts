import { Controller, Get } from "@nestjs/common";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { AppService } from "./app.servce";


@Controller('/api')
export class AppController {

    constructor(private appService: AppService) {}

    @Get('/users')
    getUsers() {
        this.appService.getUsers()
        // return  [{id: 1, name: 'Tapor'}];
    }

}
