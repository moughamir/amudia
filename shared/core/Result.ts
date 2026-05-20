export class Result<T, E = Error> {
  private constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: E
  ) {}

  static ok<T>(data: T): Result<T> {
    return new Result(true, data)
  }

  static fail<E>(error: E): Result<never, E> {
    return new Result(false, undefined, error) as Result<never, E>
  }
}
