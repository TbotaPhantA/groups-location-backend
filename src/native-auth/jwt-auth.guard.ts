import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class JwtGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        return this.validateRequest(request);
    }

    private validateRequest(request): boolean {

        const authHeader = request.headers.authorization;

        const [bearer, token] = authHeader?.split(' ') || [undefined, undefined]; 

        if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('Incorrect Authentication Header, User is not authorized!');

        try {
            const user = this.jwtService.verify(token)
        } catch {throw new UnauthorizedException('Invalid Token, User is not authorized')}

        return true;
    }

}