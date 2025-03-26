import { extendProperty } from '../_helper';
import timeOut, {AsyncFunction} from './timeOut';

declare global {
  interface PromiseConstructor {
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
    timeOut<T>(asyncFunction: AsyncFunction<T>, millisecond?: number): Promise<T> | Promise<never>;

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
    timeOut<T>(promise: Promise<T>, millisecond?: number): Promise<T> | Promise<never>;
  }
}

extendProperty(timeOut, {functionName: 'timeOut'});

const asynFunction = async () => {
  return Promise.resolve(3);
}
