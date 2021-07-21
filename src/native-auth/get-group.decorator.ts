import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/users.entity";


export const GetGroup = createParamDecorator((data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const group = request?.group;
    if (!group) throw new Error("Group is undefined, probably you're try to pull the group without group resolver decorator, add GroupResolverDecoratro")
    return group;
})
