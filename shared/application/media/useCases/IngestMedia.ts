import { Result } from "../../../core/Result"
import type { IUseCase } from "../../../core/UseCase"
import type { IMediaRepository } from "../../../domain/media/interfaces/MediaRepository"
import type { MediaProps } from "../../../domain/media/valueObjects/MediaProps"
import { Media } from "../../../domain/media/entities/Media"

export interface IngestMediaInput {
  id: string
  props: MediaProps
}

export class IngestMedia implements IUseCase<IngestMediaInput, void> {
  constructor(private mediaRepo: IMediaRepository) {}

  async execute(input: IngestMediaInput) {
    const existing = await this.mediaRepo.findById(input.id)
    if (existing) {
      return Result.fail(new Error("Media already exists"))
    }
    const media = new Media(input.id, { ...input.props, status: "processing" })
    await this.mediaRepo.create(media)
    return Result.ok(undefined)
  }
}
