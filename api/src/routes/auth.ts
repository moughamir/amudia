import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { Pool } from "pg"
import type { SessionService } from "../../../shared/infrastructure/redis/SessionService"

export function authRouter(pool: Pool, sessions: SessionService) {
  const router = Router()
  const JWT_SECRET = process.env.JWT_SECRET || "change-me"

  router.post("/register", async (req, res) => {
    const { email, password, displayName } = req.body
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" })
    }
    const hash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, display_name, role, created_at)
       VALUES ($1, $2, $3, 'user', NOW()) RETURNING id`,
      [email, hash, displayName]
    )
    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ token, userId: result.rows[0].id })
  })

  router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const result = await pool.query("SELECT id, email, password_hash, role FROM users WHERE email = $1", [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" })
    await sessions.createSession({
      userId: user.id,
      token,
      expiresAt: Math.floor(Date.now() / 1000) + 7 * 86400,
    })
    res.json({ token, userId: user.id, role: user.role })
  })

  return router
}
