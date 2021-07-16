import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class NAuthSignInInputDto {
    
    @ApiProperty({ example: 'zabor228@gmail.com', description: 'email of user'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'somePassword', description: 'open password of a user'})
    @MinLength(6, { message: 'The length of the password should be 6 symbols or more'})
    @MaxLength(500, { message: 'The length of the password should be 500 symbols or less'})
    @IsString({ message: 'password should be a string type' })
    @IsNotEmpty({ message: 'Password is empty'})
    password: string;

}