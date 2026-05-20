import { Result } from "./Result"

export interface IQuery<TCriteria, TResult> {
  execute(criteria: TCriteria): Promise<Result<TResult>>
}

export interface IQueryHandler<TCriteria, TResult> {
  handle(query: IQuery<TCriteria, TResult>): Promise<Result<TResult>>
}
