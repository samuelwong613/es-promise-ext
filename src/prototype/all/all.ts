export type ResolvedPromise<T> = Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>
type AllFunction<T> = () => ResolvedPromise<T>

// const a: ResolvedPromise<[number, number]> = Promise.resolve([11,2]);

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {T} values
 * - An array of Promises.
 * 
 * @return {AllFunction<T>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(all(
 *     [
 *       Promise.resolve(1),
 *       Promise.resolve(2),
 *       Promise.resolve(3)
 *     ]
 *   ))     
 * // return [1,2,3] in the subsequent promise
 */
export default function all<T extends readonly unknown[] | []>(values: T): AllFunction<T> {
  return () => Promise.all(values);
}