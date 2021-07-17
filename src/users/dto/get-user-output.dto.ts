import { ApiProperty } from "@nestjs/swagger"


export class GetUserOutputDto {
    @ApiProperty({ example: 'sdlfkjsldfk2234234', description: 'identificator of user' })
    readonly uuid: string;

    @ApiProperty({ example: 'Zabor', description: 'user nickname' })
    readonly name: string;

    @ApiProperty({ example: 'email@gmain.com', description: 'unique user email' })
    readonly email: string;
}