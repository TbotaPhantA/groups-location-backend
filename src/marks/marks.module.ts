import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './marks.entity';
import { UsersGroups } from 'src/groups/users_groups.entity';

@Module({
  providers: [MarksService],
  controllers: [MarksController],
  imports: [TypeOrmModule.forFeature([Mark, UsersGroups])],
})
export class MarksModule {}
