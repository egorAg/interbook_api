import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const Refresh = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const authToken: string | undefined = request.headers.refresh_token;

    if (!authToken) throw new UnauthorizedException();

    const payload = jwt.decode(authToken) as unknown as {
      sub: number;
      iat: number;
      exp: number;
    };

    if (payload.exp * 1000 > payload.iat * 1000) {
      return {
        id: payload.sub,
        ref: authToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  },
);
