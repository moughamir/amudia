export interface Job<T = unknown> {
  id: string
  name: string
  data: T
  attempts?: number
  priority?: number
}

export interface IJobQueue {
  enqueue<T>(name: string, data: T, opts?: { attempts?: number; priority?: number }): Promise<string>
  enqueueBulk<T>(jobs: Job<T>[]): Promise<string[]>
  getStatus(jobId: string): Promise<string | null>
}

export type QueueHandler<T = unknown> = (job: Job<T>) => Promise<void>
