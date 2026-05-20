import { spawn } from "child_process"
import { join } from "path"

export interface TranscodeJob {
  mediaId: string
  inputPath: string
  outputDir: string
}

export class TranscodeService {
  async createHLS(job: TranscodeJob): Promise<void> {
    return new Promise((resolve, reject) => {
      const outputPath = join(job.outputDir, job.mediaId, "master.m3u8")
      const ffmpeg = spawn("ffmpeg", [
        "-i", job.inputPath,
        "-filter_complex",
        "[0:v]split=3[v480][v720][v1080]",
        "-map", "[v480]", "-map", "0:a",
        "-c:v", "libx264", "-b:v:0", "800k", "-s:v:0", "854x480",
        "-c:a", "aac", "-b:a", "128k",
        "-map", "[v720]", "-map", "0:a",
        "-c:v:1", "libx264", "-b:v:1", "2800k", "-s:v:1", "1280x720",
        "-c:a:1", "aac", "-b:a", "128k",
        "-map", "[v1080]", "-map", "0:a",
        "-c:v:2", "libx264", "-b:v:2", "5000k", "-s:v:2", "1920x1080",
        "-c:a:2", "aac", "-b:a", "192k",
        "-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2",
        "-f", "hls",
        "-hls_time", "6",
        "-hls_playlist_type", "vod",
        "-master_pl_name", "master.m3u8",
        "-hls_segment_filename", join(job.outputDir, job.mediaId, "%v", "segment_%03d.ts"),
        outputPath,
      ])
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve()
        else reject(new Error(`FFmpeg exited with code ${code}`))
      })
      ffmpeg.on("error", reject)
    })
  }

  async generateThumbnail(inputPath: string, outputPath: string, time = "00:00:30"): Promise<void> {
    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-ss", time, "-i", inputPath,
        "-vframes", "1",
        "-s", "640x360",
        outputPath,
      ])
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve()
        else reject(new Error(`Thumbnail generation failed with code ${code}`))
      })
      ffmpeg.on("error", reject)
    })
  }
}
