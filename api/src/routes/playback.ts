import { Router } from "express"
import jwt from "jsonwebtoken"
import type { StartPlayback } from "../../../shared/application/media/useCases/StartPlayback"
import type { SessionService } from "../../../shared/infrastructure/redis/SessionService"
import type { StorageService } from "../../../shared/infrastructure/minio/StorageService"

export function playbackRouter(
  startPlayback: StartPlayback,
  sessions: SessionService,
  storage: StorageService
) {
  const router = Router()

  router.post("/start", async (req, res) => {
    const auth = req.headers.authorization?.replace("Bearer ", "")
    if (!auth) return res.status(401).json({ error: "Missing token" })
    const payload = jwt.verify(auth, process.env.JWT_SECRET || "change-me") as { userId: string }
    const result = await startPlayback.execute({
      mediaId: req.body.mediaId,
      userId: payload.userId,
      bandwidth: req.body.bandwidth,
    })
    if (!result.success) {
      return res.status(404).json({ error: result.error!.message })
    }
    await sessions.storePlaybackToken(result.data!.playbackToken, req.body.mediaId, 3600)
    res.json(result.data)
  })

  router.get("/stream/:mediaId/:quality/index.m3u8", async (req, res) => {
    const key = `hls/${req.params.mediaId}/${req.params.quality}/index.m3u8`
    const data = await storage.download(key)
    if (!data) return res.status(404).json({ error: "Stream not found" })
    res.set("Content-Type", "application/vnd.apple.mpegurl")
    res.send(data)
  })

  router.get("/stream/:mediaId/:quality/:file", async (req, res) => {
    const key = `hls/${req.params.mediaId}/${req.params.quality}/${req.params.file}`
    const data = await storage.download(key)
    if (!data) return res.status(404).json({ error: "Segment not found" })
    res.set("Content-Type", "video/MP2T")
    res.send(data)
  })

  return router
}
