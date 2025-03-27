import { extendPrototype } from '../../_helper';
import _timeOut, {AsyncFunction} from './timeOut';

declare global {
  interface Promise<T> {
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
     *   .timeOut(asyncFunction, 300)
     *   .then(doSomething)
     * // return a promise after with in 300 ms, otherwise reject with time out error
     */
     timeOut<U>(asyncFunction: AsyncFunction<U>, millisecond?: number): Promise<U> | Promise<never>;

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
      *   .timeOut(promise, 300)
      *   .then(doSomething)  
      * // return a promise after with in 300 ms, otherwise reject with time out error
      */
     timeOut<U>(promise: Promise<U>, millisecond?: number): Promise<U> | Promise<never>;
  }
}

function timeOut<T, U>(this: Promise<T>, asyncFunction: AsyncFunction<U>, millisecond?: number): Promise<U>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.timeOut called on a non-Promise instance');

  return this.then(_timeOut(asyncFunction, millisecond));
}

extendPrototype(timeOut);