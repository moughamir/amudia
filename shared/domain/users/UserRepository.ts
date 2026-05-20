import type { IRepository } from "../../core/Repository"
import type { User } from "./User"

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>
}
