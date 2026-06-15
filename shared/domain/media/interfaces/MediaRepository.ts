import type { IRepository } from "../../../core/Repository"
import type { Media } from "../entities/Media"

export interface IMediaRepository extends IRepository<Media> {
  findByTitle(query: string): Promise<Media[]>
  findByGenre(genre: string): Promise<Media[]>
  getTrending(limit?: number): Promise<Media[]>
  getByType(type: string): Promise<Media[]>
}
