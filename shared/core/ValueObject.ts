export abstract class ValueObject<T> {
  protected constructor(public readonly value:T) {
      Object.freeze(this)
  }

  equals(vo:ValueObject<T>) {
      return JSON.stringify(vo.value)
      === JSON.stringify(this.value)
  }
}
