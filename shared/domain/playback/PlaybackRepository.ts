import type { IRepository } from "../../core/Repository"
import type { PlaybackSession } from "../media/services/PlaybackService"

export interface IPlaybackRepository extends IRepository<PlaybackSession> {
  getActive(userId: string): Promise<PlaybackSession[]>
  getByMedia(userId: string, mediaId: string): Promise<PlaybackSession | null>
}
