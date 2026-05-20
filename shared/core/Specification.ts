export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean
  and(other: Specification<T>): Specification<T>
  or(other: Specification<T>): Specification<T>
  not(): Specification<T>
}

export class CompositeSpecification<T> implements Specification<T> {
  constructor(private predicate: (candidate: T) => boolean) {}

  isSatisfiedBy(candidate: T): boolean {
    return this.predicate(candidate)
  }

  and(other: Specification<T>): Specification<T> {
    return new CompositeSpecification((c) => this.isSatisfiedBy(c) && other.isSatisfiedBy(c))
  }

  or(other: Specification<T>): Specification<T> {
    return new CompositeSpecification((c) => this.isSatisfiedBy(c) || other.isSatisfiedBy(c))
  }

  not(): Specification<T> {
    return new CompositeSpecification((c) => !this.isSatisfiedBy(c))
  }
}
