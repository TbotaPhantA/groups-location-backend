import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as random from 'random-string-generator';

export type RedisGroupInviteValue = {
    inviteKey: string,
    groupUUID: string,
}

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async createGroupInvite(uuidOfGroup: string): Promise<RedisGroupInviteValue> {
        const newGeneratedInviteKey: string = random(20);
        const newInviteValue = await this.cacheManager.set<RedisGroupInviteValue>(`GroupInvite:${newGeneratedInviteKey}`, {
            inviteKey: newGeneratedInviteKey,
            groupUUID: uuidOfGroup,
        })
        return newInviteValue;
    }

    async disposeInvite(inviteKey: string): Promise<RedisGroupInviteValue> {

        const inviteValue = await this.cacheManager.get<RedisGroupInviteValue>(`GroupInvite:${inviteKey}`)
        if (!inviteValue) throw new HttpException("Such an invite either expired or doesn't exist", HttpStatus.BAD_REQUEST)

        console.log("del() function of cacheManager returns:", await this.cacheManager.del(`GroupInvite:${inviteKey}`))

        return inviteValue; 
    }
}
