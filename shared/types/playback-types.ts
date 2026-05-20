export interface StreamSourceDTO {
  id: string
  url: string
  quality: "240p" | "480p" | "720p" | "1080p" | "4k"
  metadata: Record<string, string>
}

export interface PlaybackSessionDTO {
  sessionId: string
  userId: string
  mediaId: string
  positionSeconds: number
  expiresAt: number
}

export interface StartPlaybackDTO {
  token: string
  streams: StreamSourceDTO[]
  mediaId: string
}
