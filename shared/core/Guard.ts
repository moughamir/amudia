import { Result } from "./Result"

export class Guard {
  static againstNullOrUndefined<T>(value: T, name: string): Result<T> {
    if (value === null || value === undefined) {
      return Result.fail(new Error(`${name} must not be null or undefined`))
    }
    return Result.ok(value)
  }

  static againstEmptyString(value: string, name: string): Result<string> {
    if (value.trim().length === 0) {
      return Result.fail(new Error(`${name} must not be empty`))
    }
    return Result.ok(value)
  }

  static againstNegativeNumber(value: number, name: string): Result<number> {
    if (value < 0) {
      return Result.fail(new Error(`${name} must not be negative`))
    }
    return Result.ok(value)
  }

  static isOneOf<T>(value: T, validValues: T[], name: string): Result<T> {
    if (!validValues.includes(value)) {
      return Result.fail(new Error(`${name} must be one of: ${validValues.join(", ")}`))
    }
    return Result.ok(value)
  }

  static combine(guards: Result<unknown>[]): Result<void> {
    for (const guard of guards) {
      if (!guard.success) {
        return Result.fail(guard.error!)
      }
    }
    return Result.ok(undefined)
  }
}
