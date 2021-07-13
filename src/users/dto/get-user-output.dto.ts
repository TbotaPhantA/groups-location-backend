import { ApiProperty } from "@nestjs/swagger"


export class getUserOutput {
    @ApiProperty({ example: 1, description: 'identificator of user' })
    readonly id: string;

    @ApiProperty({ example: 'Zabor', description: 'user nickname' })
    readonly name: string;

    @ApiProperty({ example: 'email@gmain.com', description: 'unique user email' })
    readonly email: string;
}