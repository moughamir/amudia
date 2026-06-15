"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"

export interface MediaDetail {
  id: string
  title: string
  description: string
  type: string
  genres: string[]
  posterUrl: string
  releaseDate: string
  duration: number
  status: string
}

export default function MediaPage() {
  const { id } = useParams<{ id: string }>()
  const [media, setMedia] = useState<MediaDetail | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetch(`/api/media/${id}`)
      .then(r => r.json())
      .then(setMedia)
  }, [id])

  const handlePlay = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to play")
      return
    }
    const res = await fetch("/api/playback/start", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mediaId: id }),
    })
    if (!res.ok) {
      alert("Playback not available")
      return
    }
    const data = await res.json()
    setStreamUrl(data.streamUrl)
  }

  if (!media) return <div>Loading...</div>

  return (
    <div>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{
          width: 300, aspectRatio: "2/3", background: "#333",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 72, color: "#555", borderRadius: 8,
        }}>
          {media.title[0]}
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>{media.title}</h1>
          <p style={{ color: "#888", margin: "8px 0" }}>
            {media.type} &middot; {media.genres.join(", ")} &middot; {media.duration} min
          </p>
          <p style={{ lineHeight: 1.6, color: "#ccc" }}>{media.description}</p>
          <button
            onClick={handlePlay}
            style={{
              padding: "12px 32px", fontSize: 16, fontWeight: 600,
              background: "#e50914", color: "#fff", border: "none",
              borderRadius: 8, cursor: "pointer", marginTop: 16,
            }}
          >
            Play
          </button>
        </div>
      </div>

      {streamUrl && (
        <div style={{ marginTop: 32 }}>
          <video
            ref={videoRef}
            controls
            autoPlay
            style={{ width: "100%", maxHeight: 600, borderRadius: 8 }}
          >
            <source src={streamUrl} type="application/vnd.apple.mpegurl" />
          </video>
        </div>
      )}
    </div>
  )
}
