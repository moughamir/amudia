import express from "express"
import cors from "cors"
import { Pool } from "pg"
import { Redis } from "ioredis"
import { authRouter } from "./routes/auth"
import { mediaRouter } from "./routes/media"
import { playbackRouter } from "./routes/playback"
import { PostgresMediaRepository } from "../../shared/infrastructure/postgres/PostgresMediaRepository"
import { SessionService } from "../../shared/infrastructure/redis/SessionService"
import { StorageService } from "../../shared/infrastructure/minio/StorageService"
import { PlaybackService } from "../../shared/domain/media/services/PlaybackService"
import { StartPlayback } from "../../shared/application/media/useCases/StartPlayback"

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const redis = new Redis(process.env.REDIS_URL!)

const mediaRepo = new PostgresMediaRepository(pool)
const sessionService = new SessionService(redis)
const storageService = new StorageService(
  process.env.S3_ENDPOINT!,
  process.env.S3_ACCESS_KEY!,
  process.env.S3_SECRET_KEY!
)
const playbackService = new PlaybackService()
const startPlayback = new StartPlayback(mediaRepo, playbackService)

app.use("/auth", authRouter(pool, sessionService))
app.use("/media", mediaRouter(mediaRepo, storageService))
app.use("/playback", playbackRouter(startPlayback, sessionService, storageService))

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

const PORT = parseInt(process.env.PORT || "8080")
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})
