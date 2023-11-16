import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/modules/crypto/guards/jwt.guard';

export const Auth = () => applyDecorators(UseGuards(JwtGuard));
