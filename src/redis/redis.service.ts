import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.module';

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async createGroupInvite(): Promise<any> {
        
    }
}
