export interface DomainEvent<
Payload = unknown
>{
    eventId:string
    occurredAt:Date
    payload:Payload
}
