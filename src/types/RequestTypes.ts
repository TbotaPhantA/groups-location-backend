import { Request } from 'express';

export type RequestWithJwtPayload = Request & {
  jwtPayload: JwtPayload;
};

export type RequestWithJwtPayloadAndGroupUUID = RequestWithJwtPayload & {
  groupUUID: string;
};

export type JwtPayload = {
  uuid: string;
  email: string;
  name: string;
};
