import type { DomainEvent } from "./DomainEvent"
import type { IEventHandler } from "./EventHandler"

type EventName = string

export class DomainEvents {
  private static handlers: Map<EventName, IEventHandler[]> = new Map()

  static register<T extends DomainEvent>(
    eventName: EventName,
    handler: IEventHandler<T>
  ): void {
    const existing = this.handlers.get(eventName) || []
    existing.push(handler as IEventHandler)
    this.handlers.set(eventName, existing)
  }

  static async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) || []
    for (const handler of handlers) {
      await handler.handle(event)
    }
  }

  static clear(): void {
    this.handlers.clear()
  }
}
