import { ApiProperty } from "@nestjs/swagger";


export class CreateGroupInputDto {

    @ApiProperty({
        example: "Ministerstvo Kaifa",
        description: "The name of the group"
    })
    name: string;

}