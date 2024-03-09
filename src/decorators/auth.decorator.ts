import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/auth/guards/jwt.auth.guard';
import { ApiUnauthorizedRes } from './api.unauthorized.res.decorator';

export const Auth = applyDecorators(
  ApiUnauthorizedRes,
  ApiBearerAuth('JWT-auth'),
  UseGuards(JwtGuard),
);
