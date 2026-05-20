export interface Mapper<Domain, Persisted, Response = Persisted> {
  toDomain(raw: Persisted): Domain
  toPersistence(domain: Domain): Persisted
  toResponse(domain: Domain): Response
}
