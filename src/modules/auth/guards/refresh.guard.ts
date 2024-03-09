import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

export class RefreshGuard implements CanActivate {
  private logger = new Logger(RefreshGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers['token'];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(token, process.env.JWT_REFRESH);
      return true;
    } catch (e) {
      this.logger.error(e.message || 'Unexpected error on auth handling');
      return false;
    }
  }
}
