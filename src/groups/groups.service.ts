import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {

    async getGroups() {
        const groups = await [
            {id: 'sadfasdf', name: 'zaborGroup', ownerId: 'lkjlk23j42l34'},
            {id: 'odsfidfogi', name: 'taporGroup', ownerId: 'o2oookj2okjokj'},
        ];
        return groups
    }

    async getGroup(groupUuid: string) {
        const groups = await [
            {id: 'sadfasdf', name: 'zaborGroup', ownerId: 'lkjlk23j42l34'},
            {id: 'odsfidfogi', name: 'taporGroup', ownerId: 'o2oookj2okjokj'},
        ];
        return groups.filter(group => group.id === groupUuid)[0]
    }
}
