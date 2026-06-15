export interface DomainEvent<
Payload = unknown
>{
    eventName:string
    eventId:string
    occurredAt:Date
    payload:Payload
}
