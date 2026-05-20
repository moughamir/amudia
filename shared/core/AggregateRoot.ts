import { Entity } from "./Entity"
import type { DomainEvent } from "./DomainEvent"

export abstract class AggregateRoot<Props, EventPayload = unknown> extends Entity<Props> {
  private _events: DomainEvent<EventPayload>[] = []

  protected addEvent(event: DomainEvent<EventPayload>): void {
    this._events.push(event)
  }

  pullEvents(): DomainEvent<EventPayload>[] {
    const events = [...this._events]
    this._events = []
    return events
  }

  clearEvents(): void {
    this._events = []
  }
}
