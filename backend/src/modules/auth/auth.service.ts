import { Injectable, UnauthorizedException } from "@nestjs/common";
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

    return this.cryptoService.generateTokenPair(user);
  }

  public async me(userId: number) {
    return this.userService.getUser(userId, false);
  }
}
