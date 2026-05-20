import { Worker } from "bullmq"
import { Redis } from "ioredis"
import { TranscodeService } from "../../shared/infrastructure/ffmpeg/TranscodeService"

const connection = new Redis(process.env.REDIS_URL!)

const transcodeService = new TranscodeService()

const worker = new Worker(
  "transcode",
  async (job) => {
    const { mediaId, inputPath, outputDir } = job.data
    console.log(`Transcoding ${mediaId}...`)

    await transcodeService.createHLS({ mediaId, inputPath, outputDir })

    console.log(`Thumbnail for ${mediaId}...`)
    await transcodeService.generateThumbnail(
      inputPath,
      `${outputDir}/${mediaId}/poster.jpg`
    )

    console.log(`Done ${mediaId}`)
  },
  { connection }
)

worker.on("completed", (job) => {
  console.log(`Job ${job!.id} completed`)
})

worker.on("failed", (job, err) => {
  console.error(`Job ${job!.id} failed:`, err)
})

console.log("Worker ready")
