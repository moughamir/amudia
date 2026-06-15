export type Cursor = string

export interface PageRequest {
    limit:number
    cursor?:Cursor
}

export interface Page<T> {
    items:T[]
    nextCursor?:Cursor
}

export interface PageInfo {
    nextCursor?:Cursor
    hasMore:boolean
}
