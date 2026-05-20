export enum ErrorCode {
  UNKNOWN = 0,
  NOT_FOUND = 1,
  VALIDATION = 2,
  FORBIDDEN = 3,
  UNAUTHORIZED = 4,
  CONFLICT = 5,
  RATE_LIMITED = 6,
  INTERNAL = 7,
}

export interface AppError {
  code: ErrorCode
  message: string
  details?: Record<string, string>
}
