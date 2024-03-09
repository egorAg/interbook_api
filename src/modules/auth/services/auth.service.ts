import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserAuthorizeDto } from 'src/modules/user/dto/user.authorize.dto';
import { UserCreateDto } from 'src/modules/user/dto/user.create.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from 'src/modules/user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  public async register(data: UserCreateDto) {
    const hash = await this.createHash(data.password);

    await this.userService.create({
      ...data,
      password: hash,
    });

    const user = await this.userService.findUser({
      login: data.login,
    });

    const tokens = await this.generateTokenPair(user);

    await this.userService.setRefresh(user.login, tokens.refresh_token);

    return tokens;
  }

  public async authorize(data: UserAuthorizeDto) {
    const user = await this.userService.findUser({
      login: data.login,
    });

    if (!user) {
      throw new HttpException(
        `User with login: ${data.login} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.password) {
      throw new HttpException(
        'Please, use Discord to authorize',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await this.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.generateTokenPair(user);

    await this.userService.setRefresh(data.login, tokens.refresh_token);

    return tokens;
  }

  public async refreshTokens(userId: number) {
    const user = await this.userService.findUser({
      id: userId,
    });

    const tokens = await this.generateTokenPair(user);

    await this.userService.setRefresh(user.login, tokens.refresh_token);

    return tokens;
  }

  private async createHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private async generateTokenPair(
    data: User,
    lifetime = { refresh: '24h', access: '12h' },
  ) {
    const accessPayload = {
      id: data.id,
    };

    const refreshPayload = {
      id: data.id,
    };

    return {
      access_token: jwt.sign(
        {
          data: accessPayload,
        },
        this.configService.getOrThrow<string>('JWT_SECRET'),
        {
          expiresIn: lifetime.access,
        },
      ),
      refresh_token: jwt.sign(
        {
          data: refreshPayload,
        },
        this.configService.getOrThrow<string>('JWT_REFRESH'),
        {
          expiresIn: lifetime.refresh,
        },
      ),
    };
  }
}
