export type ResolvedPromise<T> = Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>
type AllSettledFunction<T> = () => ResolvedPromise<T>

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.
 * 
 * @param {T} values
 * - An array of Promises.
 * 
 * @return {AllFunction<T>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(allSettled(
 *     [
 *       Promise.resolve(1),
 *       Promise.reject(2)
 *     ]
 *   ))     
 * // return [{status: 'fulfilled', value: 1},{status: 'rejected', value: 2}] in the subsequent promise
 */
export default function allSettled<T extends readonly unknown[] | []>(values: T): AllSettledFunction<T> {
  return () => Promise.allSettled(values);
}