import { Injectable } from '@nestjs/common'
import { IUsecase } from '../../../../lib/interfaces/usecase.interface'
import { UserService } from '../../services/user.service'
import { User } from '../../types/user.type'

@Injectable()
export class MeUsecase implements IUsecase<number, Promise<User>> {
  constructor(private readonly userService: UserService) {}

  async execute(input: number): Promise<User> {
    const user = await this.userService.findById(input);

    delete user.password;
    delete user.refreshToken;

    return user;
  }
}
