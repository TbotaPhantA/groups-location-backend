import { ApiProperty } from "@nestjs/swagger"


export class GetGroupOutput {
    @ApiProperty({ example: '2l3kj42l3k4j2l34', description: 'UUID identificator of user' })
    readonly id: string;

    @ApiProperty({ example: 'Zabor', description: 'user nickname' })
    readonly name: string;

    @ApiProperty({ example: 'email@gmain.com', description: 'unique user email' })
    readonly ownerId: string;
}