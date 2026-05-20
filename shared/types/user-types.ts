export interface UserDTO {
  id: string
  email: string
  displayName: string
  role: "admin" | "user"
  avatarUrl?: string
  subscriptionTier: "free" | "basic" | "premium"
  createdAt: string
}

export interface ProfileDTO {
  id: string
  userId: string
  name: string
  avatar?: string
  isKid: boolean
}

export interface AuthTokens {
  token: string
  userId: string
  role: string
}
