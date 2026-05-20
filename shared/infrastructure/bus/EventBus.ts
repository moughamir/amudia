import type { DomainEvent } from "../../core/DomainEvent"
import type { IDomainEventBus } from "../../domain/events/DomainEventBus"

type EventHandler<T = DomainEvent> = (event: T) => Promise<void>

export class InMemoryEventBus implements IDomainEventBus {
  private handlers = new Map<string, EventHandler[]>()

  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    const existing = this.handlers.get(eventName) || []
    existing.push(handler as EventHandler)
    this.handlers.set(eventName, existing)
  }

  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.constructor.name) || []
    for (const handler of handlers) {
      await handler(event)
    }
  }

  async publishMany(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event)
    }
  }
}
