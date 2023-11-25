import { User } from '@/modules/user/entities/user.entity';
import { Space } from '@/modules/spaces/entities/space.entity';

export type EventHandler<T> = (metadata: T) => void | PromiseLike<void>;

export class Event<T> {
  constructor(readonly eventName: string, readonly metadata: T) {}
}

export class EventFactory<T> {
  constructor(readonly eventName: string) {}
  produce(metadata: T): Event<T> {
    return new Event(this.eventName, metadata);
  }
}

export type UserWithDevice = {
  user: User;
};
export namespace EventsKeys {
  export const SPACE_INVITE = new EventFactory<{
    user: User;
    space: Space;
    token: string;
  }>('SPACE_INVITE');

  export const WORKSPACE_UPDATE = new EventFactory<{
    user: User;
    space: Space;
  }>('WORKSPACE_UPDATE');

  export const USER_LOGIN = new EventFactory<User>('USER_LOGIN');
}
