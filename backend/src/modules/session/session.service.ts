import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '@/modules/session/entities/session';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Space } from '@/modules/spaces/entities/space.entity';
import { EventBus, EventsKeys } from '@/services/eventBus';

@Injectable()
export class SessionService implements OnModuleInit {
  onModuleInit(): any {
    EventBus.sub(EventsKeys.WORKSPACE_UPDATE, async (metadata) => {
      await this.onWorkspaceUpdate(metadata.user, metadata.space);
    });

    EventBus.sub(EventsKeys.USER_LOGIN, async (metadata) => {
      await this.onUserLogin(metadata);
    });
  }
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  public async onUserLogin(user: User) {
    let session = await this.parseSession(user);

    if (!session) {
      session = this.sessionRepo.create();

      session.user = user;
      session.isActive = true;

      await this.sessionRepo.save(session);
    }
  }

  public async onWorkspaceUpdate(user: User, space: Space) {
    const session = await this.parseSession(user);

    if (session) {
      session.workspace = space;

      await this.sessionRepo.save(session);
    }
  }

  public async getActiveWorkspace(user: User): Promise<Space | null> {
    const session = await this.parseSession(user);

    if (!session) {
      return null;
    }

    return session.workspace;
  }

  private async parseSession(user: User): Promise<Session | undefined> {
    const session: Session | null = await this.sessionRepo.findOne({
      where: {
        user,
      },
      relations: {
        workspace: true,
      },
    });

    if (!session) {
      return undefined;
    }

    return session;
  }
}
