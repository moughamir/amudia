import type { DomainEvent } from "./DomainEvent"

export interface IEventHandler<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void>
}

export type EventHandlerConstructor<T extends DomainEvent = DomainEvent> = new () => IEventHandler<T>
