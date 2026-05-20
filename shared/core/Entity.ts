export abstract class Entity<Props> {
  protected constructor(
    public readonly id:string,
    public props: Props
  ) {}
  equals(entity: Entity<Props>){
    return entity.id === this.id
  }
}
