import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../../types/user.type';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly dataSource: Repository<UserModel>,
  ) {}

  public async findOne(findOptions: FindOneOptions<UserModel>): Promise<User> {
    return this.dataSource.findOne(findOptions);
  }

  public async create(data: Partial<User>): Promise<User> {
    const user = this.dataSource.create(data);
    await this.dataSource.save(user);
    return user;
  }

  public async update(data: Partial<User>): Promise<void> {
    const userToUpdate = await this.findOne({
      where: {
        login: data.login,
      },
    });

    await this.dataSource.save(Object.assign(userToUpdate, data));
  }
}
