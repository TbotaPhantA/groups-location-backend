import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class JwtGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        return this.doesRequestHaveBearerToken(request);
    }

    private doesRequestHaveBearerToken(request: Request): boolean {

        const authHeader = request.headers.authorization;

        const [bearer, token] = authHeader?.split(' ') || [undefined, undefined]; 

        if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('User is not authorized!');

        return true;
    }

}