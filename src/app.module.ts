import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/groups.entity';
import { UsersGroups } from './groups/users_groups.entity';
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/locations.entity';
import { MarksModule } from './marks/marks.module';
import { Mark } from './marks/marks.entity';
import { NativeAuthModule } from './native-auth/native-auth.module';
import { RefreshToken } from './native-auth/refresh_tokens.entity';
import { RedisModule } from './redis/redis.module';
import { JwtMW } from './middleware/jwtMW';

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
      entities: [User, Group, UsersGroups, Location, Mark, RefreshToken],
      synchronize: true,
    }),
    RedisModule,
    UsersModule,
    GroupsModule,
    LocationsModule,
    MarksModule,
    NativeAuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMW).forRoutes('*');
  }
}
