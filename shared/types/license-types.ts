export interface LicenseDTO {
  id: string
  mediaId: string
  provider: string
  licenseKey?: string
  expiresAt: string
  createdAt: string
}

export interface LicenseRequest {
  mediaId: string
  provider: string
  licenseKey?: string
  expiresAt: string
}
