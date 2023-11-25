import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from "@/modules/user/entities/user-data.entity";
import { User } from "@/modules/user/entities/user.entity";
import { UserCreateDto } from "@/modules/auth/dto/user.create.dto";
import { Space } from "@/modules/spaces/entities/space.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserData)
    private readonly userDataRepo: Repository<UserData>,
  ) {}

  public async createUser(data: UserCreateDto) {
    const candidate = await this.userRepo.findOne({
      where: {
        login: data.login,
      },
    });

    if (candidate) {
      throw new HttpException(
        `User with login ${data.login} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepo.create();

    user.isActive = true;
    user.login = data.login;
    user.password = data.password;
    user.spaces = [];

    const userData = this.userDataRepo.create();

    userData.email = data.data.email;
    userData.name = data.data.name;
    userData.surname = data.data.surname;

    await this.userDataRepo.save(userData);

    user.userData = userData;

    await this.userRepo.save(user);

    return user;
  }

  public async getUser(id: number, selectPass = true) {
    const candidate = await this.userRepo
        .createQueryBuilder('user')
        .select(['user.id', 'user.login', 'user.password', 'user.refreshToken'])
        .leftJoinAndSelect('user.userData', 'userData')
        .leftJoinAndSelect('user.spaces', 'spaces')
        .where('user.id = :id', { id })
        .getOne();

    if (!candidate) {
      throw new HttpException(
        `User with ID: ${id} not found`,
        HttpStatus.NO_CONTENT,
      );
    }

    if ( !selectPass ) {
      delete candidate['password']
    }

    return candidate;
  }

  public async getUserByLogin(login: string) {
    const candidate = await this.userRepo
        .createQueryBuilder('user')
        .select(['user.id', 'user.login', 'user.password'])
        .leftJoinAndSelect('user.userData', 'userData')
        .leftJoinAndSelect('user.spaces', 'spaces')
        .where('user.login = :login', { login })
        .getOne();

    if (!candidate) {
      throw new HttpException(
        `User with login: ${login} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return candidate;
  }

  public async addSpace(user: User, space: Space) {
    if ( !user.spaces ) {
      user.spaces = [space]
    } else {
      user.spaces = [...user.spaces, space];
    }

    await this.userRepo.save(user);
  }

  async setRefreshToken ( user: User, refreshToken: string ) {
    await this.userRepo.save({
      ...user,
      refreshToken
    })
  }
}
