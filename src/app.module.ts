import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.servce";


@Module({
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}