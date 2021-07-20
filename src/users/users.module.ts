import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersGroups } from 'src/groups/users_groups.entity';
import { Group } from 'src/groups/groups.entity';
import { RefreshToken } from 'src/native-auth/refresh_tokens.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Group, UsersGroups, RefreshToken])],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
