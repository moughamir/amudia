import type { ReactNode } from "react"

export const metadata = {
  title: "Amudia",
  description: "Stream licensed, public-domain, and user-owned media",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0f0f0f", color: "#fff" }}>
        <nav style={{ padding: "16px 24px", borderBottom: "1px solid #222", display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/" style={{ fontWeight: 700, fontSize: 20, color: "#e50914", textDecoration: "none" }}>Amudia</a>
          <a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Browse</a>
          <a href="/watchlist" style={{ color: "#ccc", textDecoration: "none" }}>Watchlist</a>
        </nav>
        <main style={{ maxWidth: 1280, margin: "0 auto", padding: 24 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
