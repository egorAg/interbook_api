import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const UserId = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const authToken: string | undefined = request.headers.authorization;

  if (!authToken) throw new UnauthorizedException();

  const splited = authToken.split(' ');

  if (splited[0] !== 'Bearer') throw new UnauthorizedException();

  const payload = jwt.decode(splited[1]) as {
    sub: string;
    login: string;
    exp: number;
    iat: number;
  };

  if (payload.exp * 1000 > payload.iat * 1000) {
    return payload.sub;
  } else {
    throw new UnauthorizedException();
  }
});
