import type { MediaType, MediaStatus } from "../../../core/Media"

export interface MediaProps {
  title: string
  description: string
  type: MediaType
  genres: string[]
  posterUrl: string
  releaseDate: Date
  status: MediaStatus
  duration: number
  studio?: string
  rating?: number
  seasonCount?: number
  episodeCount?: number
}
