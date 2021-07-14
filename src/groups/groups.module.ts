import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { GroupsController } from './groups.controller';
import { Group } from './groups.entity';
import { GroupsService } from './groups.service';
import { UsersGroups } from './users_groups.entity';
import { Location } from '../locations/locations.entity';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [TypeOrmModule.forFeature([Group, User, UsersGroups, Location])],
})
export class GroupsModule {}
