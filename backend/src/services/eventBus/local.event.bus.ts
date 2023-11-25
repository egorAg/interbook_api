import { PubSub } from './types';
import { Event, EventFactory, EventHandler } from './keys';
import { Logger } from '@nestjs/common';

export class LocalEventBus implements PubSub {
  private _listeners = new Map<string, EventHandler<any>[]>();

  pub<T>(event: Event<T>): void {
    const listeners = this._listeners.get(event.eventName);
    if (!listeners) {
      return;
    }
    for (const handler of listeners) {
      try {
        void (async () => handler(event.metadata))();
      } catch (error) {
        Logger.error(`Event handler failed for event ${event.eventName}`, {
          eventMeta: event.metadata,
          handler: handler,
        });
      }
    }
  }

  sub<T>(eventFactory: EventFactory<T>, handler: EventHandler<T>): void {
    let listeners = this._listeners.get(eventFactory.eventName);
    if (!listeners) {
      listeners = [];
    }
    listeners.push(handler);
    this._listeners.set(eventFactory.eventName, listeners);
  }

  unsub<T>(eventFactory: EventFactory<T>, handler: EventHandler<T>): void {
    let listeners = this._listeners.get(eventFactory.eventName);
    listeners = listeners?.filter((h) => h !== handler) ?? [];
    this._listeners.set(eventFactory.eventName, listeners);
  }
}

export const EventBus: PubSub = new LocalEventBus();
