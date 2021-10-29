import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { GroupsController } from './groups.controller';
import { Group } from './groups.entity';
import { UsersGroups } from './users_groups.entity';
import { Location } from '../locations/locations.entity';
import { NativeAuthModule } from 'src/native-auth/native-auth.module';
import { GroupsCreateService } from './services/groups-create.service';
import { GroupsUpdateService } from './services/groups-update.service';
import { GroupsReadService } from './services/groups-read.service';
import { GroupsDeleteService } from './services/groups-delete.service';
import { RedisModule } from 'src/redis/redis.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [GroupsController],
  providers: [
    GroupsCreateService,
    GroupsUpdateService,
    GroupsReadService,
    GroupsDeleteService,
  ],
  imports: [
    TypeOrmModule.forFeature([Group, User, UsersGroups, Location]),
    NativeAuthModule,
    RedisModule,
    UsersModule,
  ],
})
export class GroupsModule {}
