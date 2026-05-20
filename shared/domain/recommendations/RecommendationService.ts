import type { Media } from "../media/entities/Media"
import type { IRecommendationRepository } from "./IRecommendationRepository"

export class RecommendationService {
  constructor(private repo: IRecommendationRepository) {}

  async forUser(userId: string): Promise<Media[]> {
    const result = await this.repo.getForUser(userId)
    return result.items
  }

  async similar(mediaId: string): Promise<Media[]> {
    return this.repo.getSimilar(mediaId)
  }

  async trending(): Promise<Media[]> {
    return this.repo.getTrending()
  }
}
