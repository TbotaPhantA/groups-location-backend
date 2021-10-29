import { CacheModule, DynamicModule, Module } from '@nestjs/common';
import * as Redis from 'ioredis';
import { OptimisticLockCanNotBeUsedError } from 'typeorm';
import { RedisService } from './redis.service';

export type RedisModuleOptions = {
  host: string;
  port: number;
};

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Module({
  imports: [CacheModule.register()],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  // private static redisClient: Redis.Redis;
  // static register(options: RedisModuleOptions): DynamicModule {
  //   if (!this.redisClient) this.redisClient = new Redis()
  //   console.log('this.redisClient =', this.redisClient);
  //   return {
  //     module: RedisModule,
  //     providers: [
  //       {
  //         provide: REDIS_CLIENT,
  //         useValue: this.redisClient,
  //       },
  //       RedisService
  //     ],
  //     exports: [RedisService]
  //   }
  // }
}
