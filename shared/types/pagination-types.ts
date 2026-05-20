export interface PageRequest {
  limit: number
  cursor?: string
}

export interface PageInfo {
  hasMore: boolean
  nextCursor?: string
}

export interface PageResponse<T> {
  items: T[]
  page?: PageInfo
}
