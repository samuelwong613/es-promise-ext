import { extendPrototype } from '../../_helper';
import _retry, { AsyncFunction } from './retry';

declare global {
  interface Promise<T> {
    /**
     * Starts a promise with an asynchronous function that has retry tolerance.
     * 
     * @param {AsyncFunction<U> | Promise<U>} asyncFunction
     * - An asynchronous function that will be called, returning a result in a promise.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * @param {number} [delay=100]
     * - The time in milliseconds to wait between retries.
     * 
     * @return {Promise<U>} 
     * The function wrapper of return the result within a promise after retries.
     * 
     * @example
     * Promise.resolve().retry(asyncFunction, 5, 1000);    
     * Promise.resolve().retry(() => asyncFunction(1, 2), 5, 1000);  
     * Promise.resolve().retry(promise, 5, 1000);  
     * // Retry 5 times with a 1-second interval.
     */
    retry<U>(
      asyncFunction: AsyncFunction<U> | PromiseLike<U>, 
      count: number, 
      delay: number,
    ): Promise<U>;
  }
}

function retry<T, U>(
  this: Promise<T>,       
  asyncFunction: AsyncFunction<U> | PromiseLike<U>, 
  count: number = 3, 
  delay: number = 100
): Promise<U>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.retry called on a non-Promise instance');

  return this.then(_retry(asyncFunction, count, delay));
}

extendPrototype(retry);