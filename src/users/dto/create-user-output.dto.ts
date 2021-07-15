import { ApiProperty } from "@nestjs/swagger";



export class CreateUserOutputDto {
    
    @ApiProperty({ example: '8628a526-e5b7-11eb-ba80-0242ac130004', description: "Unique ID of the user" })
    readonly uuid: string;

    @ApiProperty({ example: 'zabor' })
    readonly name: string;

    @ApiProperty({ example: 'zabor@gmail.com' })
    readonly emails: string;

}