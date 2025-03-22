type ResolveFunction<T> = () => Promise<T>;

/**
 * Resolve the value in the promise chain.
 * 
 * @return {ResolveFunction<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve()
 *   .then(resolve())
 *   .then(doSomething) 
 */
export default function resolve<T>(): ResolveFunction<void>;

/**
 * Resolve the value in the promise chain.
 * 
 * @param {T} [value]
 * - the value pass through
 * 
 * @return {ResolveFunction<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve()
 *   .then(resolve('a'))
 *   .then(doSomething)      
 * // return 'a' in the subsequent promise
 */
export default function resolve<T>(value: T | PromiseLike<T>): ResolveFunction<T>;

export default function resolve<T>(value?: T | PromiseLike<T>): ResolveFunction<T|void> {
  if (typeof value === undefined)
    return () => Promise.resolve();

  return () => Promise.resolve(value); 
}