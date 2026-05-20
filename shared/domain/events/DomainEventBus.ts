import type { DomainEvent } from "../../core/DomainEvent"

export interface IDomainEventBus {
  publish<T extends DomainEvent>(event: T): Promise<void>
  publishMany(events: DomainEvent[]): Promise<void>
  subscribe<T extends DomainEvent>(eventName: string, handler: (event: T) => Promise<void>): void
}
