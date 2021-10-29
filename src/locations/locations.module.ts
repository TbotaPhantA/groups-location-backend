import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './locations.entity';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController],
  imports: [TypeOrmModule.forFeature([Location])],
})
export class LocationsModule {}
