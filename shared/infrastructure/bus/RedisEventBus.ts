import type Redis from "ioredis"
import type { DomainEvent } from "../../core/DomainEvent"
import type { IDomainEventBus } from "../../domain/events/DomainEventBus"

export class RedisEventBus implements IDomainEventBus {
  private prefix = "event:"

  constructor(private redis: Redis) {}

  subscribe<T extends DomainEvent>(eventName: string, handler: (event: T) => Promise<void>): void {
    this.redis.subscribe(`${this.prefix}${eventName}`, (err) => {
      if (err) throw err
    })
    this.redis.on("message", async (_channel, message) => {
      const parsed = JSON.parse(message) as T
      await handler(parsed)
    })
  }

  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const channel = `${this.prefix}${event.constructor?.name || "unknown"}`
    await this.redis.publish(channel, JSON.stringify(event))
  }

  async publishMany(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event)
    }
  }
}
