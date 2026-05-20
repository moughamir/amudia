import type { DomainEvent } from "../../core/DomainEvent"

export interface UnitOfWork {
  start(): Promise<void>
  commit(): Promise<void>
  rollback(): Promise<void>
  addEvent(event: DomainEvent): void
  getEvents(): DomainEvent[]
}

export interface IUnitOfWorkManager {
  begin(): Promise<UnitOfWork>
  execute<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T>
}
