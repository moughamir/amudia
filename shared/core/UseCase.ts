import { Result } from "./Result"

export interface IUseCase<
Input,
Output
>{
    execute(
      input:Input
    ):Promise<
      Result<Output>
    >
}
