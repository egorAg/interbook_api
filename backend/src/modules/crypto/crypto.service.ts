import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@/modules/user/entities/user.entity';
import { AnyObject } from '@/types/global.types';

@Injectable()
export class CryptoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async createPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  public async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  public async generateTokenPair(user: User) {
    const payload = { sub: user.id, role: 'USER' };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: `24h`,
        secret: this.configService.get<string>('secrets.jwt_access'),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: `7d`,
        secret: this.configService.get<string>('secrets.jwt_refresh'),
      }),
    };
  }

  public async createSpaceToken(payload: AnyObject, expiresIn = '24h') {
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get<string>('secrets.space_secret'),
    });
  }

  public async decodeSpaceToken(token: string) {
    return this.jwtService.decode(token);
  }
}
