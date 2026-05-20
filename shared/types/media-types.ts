export enum MediaType {
  MEDIA_UNKNOWN = 0,
  MOVIE = 1,
  SERIES = 2,
  MUSIC = 3,
  DOCUMENTARY = 4,
}

export enum MediaStatus {
  PROCESSING = 0,
  READY = 1,
  BLOCKED = 2,
}

export interface MediaDTO {
  id: string
  title: string
  description: string
  type: MediaType
  genres: string[]
  durationSeconds: number
  posterUrl: string
  status: MediaStatus
  releaseDate?: string
  studio?: string
  rating?: number
}
