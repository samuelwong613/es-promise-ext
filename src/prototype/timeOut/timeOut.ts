export type AsyncFunction<T> = () => Promise<T>
type TimeOutFunction<T> = () => Promise<T> | Promise<never>;
import promiseDelay from "../../delay/delay";

/**
 * Call the async function with time out limit.
 * 
 * @param {AsyncFunction<U>} asyncFunction
 * - an async function
 * 
 * @param {number} [millisecond=1000]
 * - the time limit for the time out
 * 
 * @return {Promise<U> | Promise<never>} 
 * The returned promise
 * 
 * @example
 * Promise.resolve('a')
 *   .then(timeOut(asyncFunction, 300))
 *   .then(doSomething)  
 * // return a promise after with in 300 ms, otherwise reject with time out error
 */
export default function timeOut<U>(asyncFunction: AsyncFunction<U>, millisecond?: number): TimeOutFunction<U>;

 /**
  * Return the promise with time out limit.
  * 
  * @param {Promise<U>} promise
  * - a promise
  * 
  * @param {number} [millisecond=1000]
  * - the time limit for the time out
  * 
  * @return {Promise<U> | Promise<never>} 
  * The returned promise
  * 
  * @example
  * Promise.resolve('a')
  *   .then(timeOut(promise, 300))
  *   .then(doSomething)  
  * // return a promise after with in 300 ms, otherwise reject with time out error
  */
export default function timeOut<U>(promise: Promise<U>, millisecond?: number): TimeOutFunction<U>;

export default function timeOut<U>(asyncFunction: AsyncFunction<U> | Promise<U>, millisecond: number = 1000): TimeOutFunction<U> {
	if (!(asyncFunction instanceof Promise) && typeof asyncFunction !== 'function')
		throw TypeError('Promise.timeOut parameter 1 must be an async function or Promise');

  if (!Number.isInteger(millisecond) || millisecond < 0)
    throw TypeError('Promise.timeOut parameter 2 must be a positive integer');

  const promise = typeof asyncFunction === 'function' ? asyncFunction() : asyncFunction;
  return () => Promise.race([
    promise,
    promiseDelay(millisecond).then(()=>Promise.reject(new Error(`Time Out Error: promise can not resolve in ${millisecond}ms`)))
  ]);
}