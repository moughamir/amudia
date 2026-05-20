export type MediaType =
 | "movie"
 | "series"
 | "music"
 | "documentary"

export type MediaStatus =
 | "processing"
 | "ready"
 | "blocked"
export interface MediaProps {

    title:string

    description:string

    type:MediaType

    genres:string[]

    posterUrl:string

    releaseDate:Date

    status:MediaStatus

    duration:number

}
