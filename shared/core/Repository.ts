export interface IRepository<
    Entity,
    Id = string
>{

    findById(
        id:Id
    ):Promise<Entity|null>

    create(
        entity:Entity
    ):Promise<void>

    update(
        entity:Entity
    ):Promise<void>

    delete(
        id:Id
    ):Promise<void>
}
