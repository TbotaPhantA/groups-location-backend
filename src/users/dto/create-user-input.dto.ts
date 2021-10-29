import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserInputDto {
  @ApiProperty({ example: 'Zobor288', description: 'a nickname of a user' })
  @MinLength(2, { message: 'The length of the user name should be 2 or more' })
  @MaxLength(60, {
    message: 'The Length of the user name should be 60 or less',
  })
  @IsString({ message: 'name should be a string type' })
  @IsNotEmpty({ message: 'Name of the user is empty' })
  readonly name: string;

  @ApiProperty({ example: 'zabor228@gmail.com', description: 'email of user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'somePassword',
    description: 'open password of a user',
  })
  @MinLength(6, {
    message: 'The length of the password should be 6 symbols or more',
  })
  @MaxLength(500, {
    message: 'The length of the password should be 500 symbols or less',
  })
  @IsString({ message: 'password should be a string type' })
  @IsNotEmpty({ message: 'Password is empty' })
  readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
