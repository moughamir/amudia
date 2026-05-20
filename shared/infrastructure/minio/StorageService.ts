import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

export class StorageService {
  private client: S3Client
  private bucket: string

  constructor(endpoint: string, accessKey: string, secretKey: string, bucket = "amudia") {
    this.client = new S3Client({
      endpoint,
      region: "us-east-1",
      credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
      forcePathStyle: true,
    })
    this.bucket = bucket
  }

  async upload(key: string, body: Buffer | Blob, contentType: string): Promise<string> {
    await this.client.send(
      new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: body, ContentType: contentType })
    )
    return `${this.bucket}/${key}`
  }

  async download(key: string): Promise<Buffer | null> {
    try {
      const result = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }))
      return Buffer.from(await result.Body!.transformToByteArray())
    } catch {
      return null
    }
  }

  async listHLSAssets(mediaId: string): Promise<string[]> {
    const result = await this.client.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Prefix: `hls/${mediaId}/` })
    )
    return (result.Contents ?? []).map(o => o.Key!).filter(Boolean)
  }
}
