"use client"

import { useEffect, useState } from "react"

interface MediaItem {
  id: string
  title: string
  description: string
  type: string
  genres: string[]
  posterUrl: string
  duration: number
  status: string
}

export default function Home() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const url = search
      ? `/api/media?q=${encodeURIComponent(search)}`
      : "/api/media"
    fetch(url)
      .then(r => r.json())
      .then(setMedia)
  }, [search])

  return (
    <div>
      <input
        type="text"
        placeholder="Search titles..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 8,
          border: "1px solid #333", background: "#1a1a1a", color: "#fff",
          fontSize: 16, marginBottom: 24, boxSizing: "border-box",
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
        {media.map(item => (
          <a
            key={item.id}
            href={`/media/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{
              background: "#1a1a1a", borderRadius: 8, overflow: "hidden",
              transition: "transform 0.2s", cursor: "pointer",
            }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{
                aspectRatio: "2/3", background: "#333",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48, color: "#555",
              }}>
                {item.title[0]}
              </div>
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: 0, fontSize: 14 }}>{item.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                  {item.type} &middot; {item.genres.join(", ")}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
