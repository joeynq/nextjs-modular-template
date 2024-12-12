/* eslint-disable @typescript-eslint/no-explicit-any */
export type PromiseFunction<R = unknown> = (...args: any[]) => Promise<R>;