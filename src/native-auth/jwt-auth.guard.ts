import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UNAUTHORIZED_EXCEPTION_MESSAGE } from 'src/helpers/errors';
import { JwtPayload, RequestWithJwtPayload } from 'src/types/RequestTypes';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithJwtPayload = context.switchToHttp().getRequest();

    JwtGuard.assertJwtPayloadInRequest(request);
    return true;
  }

  /**
   * THIS CAN BE USED ONLY IF JWTGUARD IS APPLIED
   * returns jwtPayload from request if it presents
   * otherwise throws UnauthorizedException
   */
  static getJwtPayloadFromRequest(req: RequestWithJwtPayload): JwtPayload {
    JwtGuard.assertJwtPayloadInRequest(req);
    return req.jwtPayload;
  }

  /**
   * thorws an UnauthorizedException if request doens't have jwtPayload
   */
  private static assertJwtPayloadInRequest(
    request: RequestWithJwtPayload,
  ): void {
    if (!request.jwtPayload)
      throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION_MESSAGE);
  }
}
