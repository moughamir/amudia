import { Entity } from "../../../core/Entity"
import type { MediaProps } from "../valueObjects/MediaProps"
import type { MediaStatus } from "../../../core/Media"

export class Media extends Entity<MediaProps> {
  constructor(id: string, props: MediaProps) {
    super(id, props)
  }

  get title() {
    return this.props.title
  }

  get status() {
    return this.props.status
  }

  publish() {
    this.props.status = "ready"
  }

  block() {
    this.props.status = "blocked"
  }

  updateMeta(partial: Partial<MediaProps>) {
    Object.assign(this.props, partial)
  }
}
