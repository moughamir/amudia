import { ValueObject } from "./ValueObject"

export class Identifier<T> extends ValueObject<T> {
  constructor(value: T) {
    super(value)
  }

  toString(): string {
    return String(this.value)
  }
}

export type EntityId = Identifier<string>
