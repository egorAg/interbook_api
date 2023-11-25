import { InjectRepository } from '@nestjs/typeorm';
import { Space } from '@/modules/spaces/entities/space.entity';
import { Repository } from 'typeorm';
import { UserService } from '@/modules/user/user.service';
import * as crypto from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnyObject } from '@/types/global.types';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { EventBus, EventsKeys } from '@/services/eventBus';
import { KeyStorageService } from '@/services/keyStorage/keyStorage.service';
import { KeyStorageKeys } from '@/services/keyStorage/keyStorage.keys';
import { SpaceCreateDto } from '@/modules/spaces/dto/space.create.dto';
import { Candidate } from '@/modules/candidate/entities/candidate.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space) private readonly spaceRepo: Repository<Space>,
    private userService: UserService,
    private cryptoService: CryptoService,
    private keyStorage: KeyStorageService,
  ) {}
  public async createService(userId: number, payload: SpaceCreateDto) {
    const user = await this.userService.getUser(userId);

    const space = this.spaceRepo.create();

    space.adminId = user.id;
    space.name = payload.name;
    space.users = [];

    await this.spaceRepo.save(space);

    await this.userService.addSpace(user, space);
    return space;
  }

  public async getSpaceById(id: number) {
    const candidate = await this.spaceRepo.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
      },
    });

    if (!candidate) {
      throw new HttpException(
        `Can't find space with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const user of candidate.users) {
      delete user.refreshToken;
    }

    return candidate;
  }

  public async createInviteToken(
    invitor: number,
    spaceId: number,
    userId?: number,
  ) {
    const payload: AnyObject = {
      spaceId,
    };

    const from = await this.userService.getUser(invitor);

    if (userId) {
      payload['userId'] = userId;
    }

    const space = await this.getSpaceById(spaceId);

    if (space.adminId !== invitor) {
      throw new HttpException(
        `You are not an admin`,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    payload['spaceId'] = space.id;

    const token = await this.cryptoService.createSpaceToken(payload);

    const inviteToken = crypto.randomUUID();

    await this.keyStorage.set(
      KeyStorageKeys.SPACE_INVITE(inviteToken),
      token,
      24 * 60 * 60,
    );

    EventBus.pub(
      EventsKeys.SPACE_INVITE.produce({
        user: from,
        space,
        token: inviteToken,
      }),
    );

    return { inviteToken };
  }

  public async acceptInvite(inviteToken: string, userId: number) {
    const user = await this.userService.getUser(userId);

    const key = KeyStorageKeys.SPACE_INVITE(inviteToken);

    const token = await this.keyStorage.get(key);

    if (!token) {
      throw new HttpException(
        `Can't find provided token`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokenPayload = await this.cryptoService.decodeSpaceToken(token);

    if (!tokenPayload.spaceId) {
      throw new HttpException(
        `Can't parse spaceId from token`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const space = await this.getSpaceById(tokenPayload.spaceId);

    const spaceUsers = space.users.map((spaceUser) => spaceUser.id);
    if (spaceUsers.includes(user.id)) {
      throw new HttpException(
        `You already in this space`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.addSpace(user, space);

    return {
      success: true,
    };
  }

  public async addCandidate(candidate: Candidate, spaceId: number) {
    const space = await this.getSpaceById(spaceId);

    const candidateIds = space.candidates.map((can) => can.id);

    if (candidateIds.includes(candidate.id)) {
      throw new HttpException(
        `Candidate with id: ${candidate.id} already exists in this workspace`,
        HttpStatus.BAD_REQUEST,
      );
    }

    space.candidates = [...space.candidates, candidate];

    await this.spaceRepo.save(space);
  }
}
