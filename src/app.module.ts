import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.entity";
import { GroupsModule } from './groups/groups.module';
import { Group } from "./groups/groups.entity";
import { UsersGroups } from "./groups/users_groups.entity";
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/locations.entity';
import { MarksModule } from './marks/marks.module';
import { Mark } from "./marks/marks.entity";


@Module({
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
            entities: [User, Group, UsersGroups, Location, Mark],
            synchronize: true,
        }),
        UsersModule,
        GroupsModule,
        LocationsModule,
        MarksModule,
    ]
})
export class AppModule {}