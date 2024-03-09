import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../entities/models/user.model';
import { UserRepository } from '../entities/repositories/user.repository';
import { User } from '../types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  public async create(data: Partial<User>): Promise<void> {
    const candidate = await this.userRepository.findOne({
      where: {
        login: data.login,
      },
    });

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.create(data);
  }

  public async findUser(findOptions: Partial<User>): Promise<UserModel> {
    return this.userRepository.findOne({
      where: {
        login: findOptions.login,
      },
    });
  }

  public async setRefresh(login: string, refreshToken: string) {
    await this.userRepository.update({
      login,
      refreshToken,
    });
  }
}
