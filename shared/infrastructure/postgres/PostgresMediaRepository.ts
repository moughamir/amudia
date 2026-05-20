import type { Pool } from "pg"
import { Media } from "../../domain/media/entities/Media"
import type { IMediaRepository } from "../../domain/media/intefaces/MediaRepository"
import type { MediaProps } from "../../domain/media/valueObjects/MediaProps"

export class PostgresMediaRepository implements IMediaRepository {
  constructor(private pool: Pool) {}

  async findById(id: string): Promise<Media | null> {
    const result = await this.pool.query("SELECT * FROM media WHERE id = $1", [id])
    if (result.rows.length === 0) return null
    return this.rowToMedia(result.rows[0])
  }

  async create(media: Media): Promise<void> {
    const p = media.props
    await this.pool.query(
      `INSERT INTO media (id, title, description, type, genres, poster_url, release_date, status, duration, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [media.id, p.title, p.description, p.type, p.genres, p.posterUrl, p.releaseDate, p.status, p.duration]
    )
  }

  async update(media: Media): Promise<void> {
    const p = media.props
    await this.pool.query(
      `UPDATE media SET title=$2, description=$3, type=$4, genres=$5, poster_url=$6, release_date=$7, status=$8, duration=$9 WHERE id=$1`,
      [media.id, p.title, p.description, p.type, p.genres, p.posterUrl, p.releaseDate, p.status, p.duration]
    )
  }

  async delete(id: string): Promise<void> {
    await this.pool.query("DELETE FROM media WHERE id = $1", [id])
  }

  async findByTitle(query: string): Promise<Media[]> {
    const result = await this.pool.query("SELECT * FROM media WHERE title ILIKE $1", [`%${query}%`])
    return result.rows.map(r => this.rowToMedia(r))
  }

  async findByGenre(genre: string): Promise<Media[]> {
    const result = await this.pool.query("SELECT * FROM media WHERE $1 = ANY(genres)", [genre])
    return result.rows.map(r => this.rowToMedia(r))
  }

  async getTrending(limit = 20): Promise<Media[]> {
    const result = await this.pool.query("SELECT * FROM media ORDER BY created_at DESC LIMIT $1", [limit])
    return result.rows.map(r => this.rowToMedia(r))
  }

  async getByType(type: string): Promise<Media[]> {
    const result = await this.pool.query("SELECT * FROM media WHERE type = $1", [type])
    return result.rows.map(r => this.rowToMedia(r))
  }

  private rowToMedia(row: any): Media {
    return new Media(row.id, {
      title: row.title,
      description: row.description,
      type: row.type,
      genres: row.genres,
      posterUrl: row.poster_url,
      releaseDate: row.release_date,
      status: row.status,
      duration: row.duration,
    })
  }
}
