import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { User } from '../../types/user.type';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Injectable()
export class MeUsecase implements IUsecase<number, Promise<User>> {
  constructor(private readonly userService: UserService) {}

  async execute(input: number): Promise<User> {
    const user = await this.userService.findUser({
      id: input,
    });

    delete user.password;
    delete user.refreshToken;

    return user;
  }
}
