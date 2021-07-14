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

    async getGroup(group_uuid: string) {
        const groups = await [
            {id: 'sadfasdf', name: 'zaborGroup', ownerId: 'lkjlk23j42l34'},
            {id: 'odsfidfogi', name: 'taporGroup', ownerId: 'o2oookj2okjokj'},
        ];
        return groups.filter(group => group.id === group_uuid)[0]
    }
}
