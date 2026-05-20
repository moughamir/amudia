import type { DomainEvent } from "../../core/DomainEvent"

export interface PlaybackStartedEvent extends DomainEvent<{
  userId: string
  mediaId: string
  sessionId: string
  quality: string
}> {}

export interface PlaybackProgressEvent extends DomainEvent<{
  userId: string
  mediaId: string
  sessionId: string
  positionSeconds: number
  durationSeconds: number
}> {}

export interface PlaybackCompletedEvent extends DomainEvent<{
  userId: string
  mediaId: string
  sessionId: string
}> {}
