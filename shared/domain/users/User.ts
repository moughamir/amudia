import { Entity } from "../../core/Entity"

export type UserRole = "admin" | "user"

export interface UserProps {
  email: string
  displayName: string
  role: UserRole
  avatarUrl?: string
  subscriptionTier?: "free" | "basic" | "premium"
  createdAt: Date
}

export class User extends Entity<UserProps> {
  constructor(id: string, props: UserProps) {
    super(id, props)
  }

  promote() {
    this.props.role = "admin"
  }

  setSubscription(tier: UserProps["subscriptionTier"]) {
    this.props.subscriptionTier = tier
  }
}
