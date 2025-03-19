import { extendPrototype } from '../../_helper';
import _retry, { AsyncFunction } from './retry';

declare global {
  interface Promise<T> {
    /**
     * Starts a promise with an asynchronous function that has retry tolerance.
     * 
     * @param {AsyncFunction<T> | Promise<T>} asyncFunction
     * - An asynchronous function that will be called, returning a result in a promise.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * @param {number} [delay=100]
     * - The time in milliseconds to wait between retries.
     * 
     * @return {RetryFunction<T>} 
     * The function wrapper of return the result within a promise after retries.
     * 
     * @example
     * Promise.resolve().retry(asyncFunction, 5, 1000);    
     * Promise.resolve().retry(() => asyncFunction(1, 2), 5, 1000);  
     * Promise.resolve().retry(promise, 5, 1000);  
     * // Retry 5 times with a 1-second interval.
     */
    retry(
      asyncFunction: AsyncFunction<T> | PromiseLike<T>, 
      count: number, 
      delay: number,
    ): Promise<T>;
  }
}

function retry<T>(
  this: Promise<T>,       
  asyncFunction: AsyncFunction<T> | PromiseLike<T>, 
  count: number = 3, 
  delay: number = 100
): Promise<T>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.retry called on a non-Promise instance');

  return this.then(_retry(asyncFunction, count, delay));
}

extendPrototype(retry);