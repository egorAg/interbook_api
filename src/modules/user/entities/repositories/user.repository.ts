import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../../types/user.type';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel) private readonly repo: Repository<UserModel>,
  ) {}

  public async findOne(findOptions: FindOneOptions<UserModel>): Promise<User> {
    return this.repo.findOne(findOptions);
  }

  public async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    await this.repo.save(user);
    return user;
  }

  public async update(data: Partial<User>): Promise<void> {
    const userToUpdate = await this.findOne({
      where: {
        login: data.login,
      },
    });

    await this.repo.save(Object.assign(userToUpdate, data));
  }
}
