import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.servce";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.entity";


@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB, 
            entities: [User],
            synchronize: true,
        }),
        UsersModule
    ]
})
export class AppModule {}