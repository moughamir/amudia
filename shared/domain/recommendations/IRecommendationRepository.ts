import type { Media } from "../media/entities/Media"
import type { PageRequest, PageInfo } from "../../core/Pagination"

export interface IRecommendationRepository {
  getForUser(userId: string, page?: PageRequest): Promise<{ items: Media[]; page?: PageInfo }>
  getSimilar(mediaId: string, limit?: number): Promise<Media[]>
  getTrending(limit?: number): Promise<Media[]>
}
