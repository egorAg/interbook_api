import { Event, EventFactory, EventHandler } from './keys';

export interface PubSub {
  pub<T>(event: Event<T>): void;

  sub<T>(eventFactory: EventFactory<T>, handler: EventHandler<T>): void;

  unsub<T>(eventFactory: EventFactory<T>, handler: EventHandler<T>): void;
}
