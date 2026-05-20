import type { DomainEvent } from "../../core/DomainEvent"

export interface MediaIngestedEvent extends DomainEvent<{
  mediaId: string
  title: string
}> {}

export interface MediaPublishedEvent extends DomainEvent<{
  mediaId: string
}> {}

export interface MediaBlockedEvent extends DomainEvent<{
  mediaId: string
  reason: string
}> {}
