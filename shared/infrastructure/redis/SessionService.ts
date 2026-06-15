import type { Redis } from "ioredis"

export interface StoredSession {
  userId: string
  token: string
  expiresAt: number
}

export class SessionService {
  constructor(private redis: Redis) {}

  async createSession(session: StoredSession): Promise<void> {
    await this.redis.set(
      `session:${session.token}`,
      JSON.stringify(session),
      "EXAT",
      session.expiresAt
    )
  }

  async getSession(token: string): Promise<StoredSession | null> {
    const raw = await this.redis.get(`session:${token}`)
    if (!raw) return null
    return JSON.parse(raw) as StoredSession
  }

  async invalidate(token: string): Promise<void> {
    await this.redis.del(`session:${token}`)
  }

  async storePlaybackToken(token: string, mediaId: string, ttl: number): Promise<void> {
    await this.redis.set(`playback:${token}`, mediaId, "EX", ttl)
  }

  async validatePlaybackToken(token: string): Promise<string | null> {
    return this.redis.get(`playback:${token}`)
  }
}
