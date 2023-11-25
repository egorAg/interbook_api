import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import { CryptoService } from "@/modules/crypto/crypto.service";
import { UserCreateDto } from "@/modules/auth/dto/user.create.dto";
import { UserAuthDto } from "@/modules/auth/dto/user.auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async register(data: UserCreateDto) {
    const password = await this.cryptoService.createPassword(data.password);

    await this.userService.createUser({ ...data, password });
  }

  public async login(data: UserAuthDto) {
    const user = await this.userService.getUserByLogin(data.login);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.cryptoService.validatePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.cryptoService.generateTokenPair(user);

    await this.userService.setRefreshToken(user, tokens.refresh_token)

    return tokens
  }

  public async me(userId: number) {
    return this.userService.getUser(userId, false);
  }

  async refresh ( data: { id: number; ref: string } ) {
    const user = await this.userService.getUser( data.id );

    if ( user.refreshToken !== data.ref ) {
      throw new HttpException(`Invalid refresh token`, HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.cryptoService.generateTokenPair( user );

    await this.userService.setRefreshToken(user, tokens.refresh_token);

    return tokens
  }
}
