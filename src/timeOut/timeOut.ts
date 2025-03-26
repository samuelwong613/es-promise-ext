import promiseDelay from "../delay/delay";

export type AsyncFunction<T> = () => Promise<T>

/**
 * Call the async function with time out limit.
 * 
 * @param {AsyncFunction<T>} asyncFunction
 * - an async function
 * 
 * @param {number} [millisecond=1000]
 * - the time limit for the time out
 * 
 * @return {Promise<T> | Promise<never>} 
 * The returned promise
 * 
 * @example
 * promiseTimeOut(asyncFunction, 300)
 *   .then(doSomething)  
 * // return a promise after with in 300 ms, otherwise reject with time out error
 */
export default function promiseTimeOut<T>(asyncFunction: AsyncFunction<T>, millisecond?: number): Promise<T> | Promise<never>;

/**
 * Return the promise with time out limit.
 * 
 * @param {Promise<T>} promise
 * - a promise
 * 
 * @param {number} [millisecond=1000]
 * - the time limit for the time out
 * 
 * @return {Promise<T> | Promise<never>} 
 * The returned promise
 * 
 * @example
 * promiseTimeOut(promise, 300)
 *   .then(doSomething)  
 * // return a promise after with in 300 ms, otherwise reject with time out error
 */
export default function promiseTimeOut<T>(promise: Promise<T>, millisecond?: number): Promise<T> | Promise<never>;


export default function promiseTimeOut<T>(asyncFunction: AsyncFunction<T> | Promise<T>, millisecond: number = 1000): Promise<T> | Promise<never> {
	if (!(asyncFunction instanceof Promise) && typeof asyncFunction !== 'function')
		throw TypeError('Promise.timeOut parameter 1 must be an async function or Promise');

  if (!Number.isInteger(millisecond) || millisecond < 0)
    throw TypeError('Promise.timeOut parameter 2 must be a positive integer');

  const promise = typeof asyncFunction === 'function' ? asyncFunction() : asyncFunction;
  return Promise.race([
    promise,
    promiseDelay(millisecond).then(()=>Promise.reject(new Error(`Time Out Error: promise can not resolve in ${millisecond}ms`)))
  ]);
}
