import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { RequestWithJwtPayload } from 'src/types/RequestTypes';

export class JwtMW implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: RequestWithJwtPayload, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const [bearer, token] = authHeader?.split(' ') || [undefined, undefined];

    if (bearer !== 'Bearer' || !token) next();

    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      req.jwtPayload = jwtPayload;
    } catch {
      next();
    }
  }
}
