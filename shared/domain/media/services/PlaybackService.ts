export interface StreamSource<Meta = unknown> {
  id: string
  url: string
  quality: "240p" | "480p" | "720p" | "1080p" | "4k"
  metadata: Meta
}

export interface PlaybackSession {
  userId: string
  mediaId: string
  position: number
  startedAt: Date
  expiresAt: Date
}

export class PlaybackService {
  selectBestSource<T>(sources: StreamSource<T>[], bandwidth: number): StreamSource<T> | undefined {
    if (bandwidth > 25000) {
      return sources.find(s => s.quality === "4k")
    }
    if (bandwidth > 8000) {
      return sources.find(s => s.quality === "1080p")
    }
    if (bandwidth > 3000) {
      return sources.find(s => s.quality === "720p")
    }
    return sources.find(s => s.quality === "480p")
  }
}
