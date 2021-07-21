import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "src/users/users.entity";


/**
 * THIS DECORATOR WON'T WORK WITHOUT JWTGUARD!!! 
 */
export const GetAuthenticatedUser = createParamDecorator((data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    if (!user) throw new Error("User is undefined, probably you're trying to pull the user without the Authentication Guard. Please add the authentication guard to method of the controller which uses this decodator without Authenticatino guards");
    return user;
})