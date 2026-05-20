import { Entity } from "../../core/Entity"

export interface LicenseProps {
  mediaId: string
  provider: string
  licenseKey?: string
  expiresAt: Date
  createdAt: Date
}

export class License extends Entity<LicenseProps> {
  constructor(id: string, props: LicenseProps) {
    super(id, props)
  }

  get isExpired(): boolean {
    return new Date() > this.props.expiresAt
  }

  get isActive(): boolean {
    return !this.isExpired
  }
}
