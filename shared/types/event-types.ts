export interface MediaIngestedEvent {
  mediaId: string
  occurredAt: number
  title: string
}

export interface MediaPublishedEvent {
  mediaId: string
  occurredAt: number
}

export interface MediaBlockedEvent {
  mediaId: string
  occurredAt: number
  reason: string
}

export interface PlaybackStartedEvent {
  userId: string
  mediaId: string
  sessionId: string
  quality: string
  occurredAt: number
}

export interface PlaybackProgressEvent {
  sessionId: string
  userId: string
  mediaId: string
  positionSeconds: number
  durationSeconds: number
  occurredAt: number
}

export interface PlaybackCompletedEvent {
  sessionId: string
  userId: string
  mediaId: string
  occurredAt: number
}
