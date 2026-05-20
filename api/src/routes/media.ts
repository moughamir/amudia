import { Router } from "express"
import type { IMediaRepository } from "../../../shared/domain/media/intefaces/MediaRepository"
import type { StorageService } from "../../../shared/infrastructure/minio/StorageService"
import { Media } from "../../../shared/domain/media/entities/Media"

export function mediaRouter(mediaRepo: IMediaRepository, storage: StorageService) {
  const router = Router()

  router.get("/", async (req, res) => {
    const { type, genre, q } = req.query
    let result
    if (q) {
      result = await mediaRepo.findByTitle(q as string)
    } else if (genre) {
      result = await mediaRepo.findByGenre(genre as string)
    } else if (type) {
      result = await mediaRepo.getByType(type as string)
    } else {
      result = await mediaRepo.getTrending()
    }
    res.json(result.map(m => ({ id: m.id, ...m.props })))
  })

  router.get("/:id", async (req, res) => {
    const media = await mediaRepo.findById(req.params.id)
    if (!media) return res.status(404).json({ error: "Not found" })
    res.json({ id: media.id, ...media.props })
  })

  router.post("/", async (req, res) => {
    const { id, ...props } = req.body
    const media = new Media(id, { ...props, status: "processing" })
    await mediaRepo.create(media)
    res.status(201).json({ id: media.id, ...media.props })
  })

  router.patch("/:id", async (req, res) => {
    const media = await mediaRepo.findById(req.params.id)
    if (!media) return res.status(404).json({ error: "Not found" })
    media.updateMeta(req.body)
    await mediaRepo.update(media)
    res.json({ id: media.id, ...media.props })
  })

  router.delete("/:id", async (req, res) => {
    await mediaRepo.delete(req.params.id)
    res.status(204).end()
  })

  return router
}
