import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateGroupNameInputDto {
  @ApiProperty({
    example: 'Ministerstvo Kaifa',
    description: 'The new name of the group',
  })
  @MinLength(4, { message: 'The minimal length of the group is 4' })
  @MaxLength(30, { message: 'The maximum length of the group is 30' })
  @IsString()
  name: string;
}
