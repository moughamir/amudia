import { Result } from "../../../core/Result"
import type { IUseCase } from "../../../core/UseCase"
import type { IMediaRepository } from "../../../domain/media/intefaces/MediaRepository"
import { PlaybackService } from "../../../domain/media/services/PlaybackService"

export interface StartPlaybackInput {
  mediaId: string
  userId: string
  bandwidth?: number
}

export interface StartPlaybackOutput {
  playbackToken: string
  streamUrl: string
  sources: { quality: string; url: string }[]
}

export class StartPlayback implements IUseCase<StartPlaybackInput, StartPlaybackOutput> {
  constructor(
    private mediaRepo: IMediaRepository,
    private playbackService: PlaybackService
  ) {}

  async execute(input: StartPlaybackInput) {
    const media = await this.mediaRepo.findById(input.mediaId)
    if (!media) {
      return Result.fail(new Error("Media not found"))
    }
    if (media.status !== "ready") {
      return Result.fail(new Error("Media is not available"))
    }
    const playbackToken = crypto.randomUUID()
    const streamUrl = `/api/stream/${input.mediaId}/master.m3u8`
    const sources = [
      { quality: "480p", url: `/api/stream/${input.mediaId}/480p/index.m3u8` },
      { quality: "720p", url: `/api/stream/${input.mediaId}/720p/index.m3u8` },
      { quality: "1080p", url: `/api/stream/${input.mediaId}/1080p/index.m3u8` },
    ]
    return Result.ok({ playbackToken, streamUrl, sources })
  }
}
