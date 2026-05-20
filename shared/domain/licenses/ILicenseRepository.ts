import type { IRepository } from "../../core/Repository"
import type { License } from "./License"

export interface ILicenseRepository extends IRepository<License> {
  findByMedia(mediaId: string): Promise<License[]>
  findActiveByMedia(mediaId: string): Promise<License | null>
  findByProvider(provider: string): Promise<License[]>
}
