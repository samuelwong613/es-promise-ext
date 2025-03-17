import {extendProperty} from '../_helper';
import retry, {AsyncFunction} from './retry';

declare global {
  interface PromiseConstructor {
    /**
     * Starts a promise with an asynchronous function that has retry tolerance.
     * 
     * @param {AsyncFunction<T>} asyncFunction
     * - An asynchronous function that will be called, returning a result in a promise.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(asyncFunction);
     * Promise.retry(() => asyncFunction(1, 2));
     */
    retry<T>(asyncFunction: AsyncFunction<T>): Promise<T>;

    /**
     * Starts a promise with a given promise that has retry tolerance.
     * 
     * @param {PromiseLike<T>} promise
     * - A promise that holds the result.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(promise);
     */
    retry<T>(promise: PromiseLike<T>): Promise<T>;

    /**
     * Starts a promise with a value.
     * 
     * @param {T} value
     * - A value
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(3);
     */
     retry<T>(promise: PromiseLike<T>): Promise<T>;
 
    /**
     * Starts a promise with an asynchronous function that has retry tolerance.
     * 
     * @param {AsyncFunction<T>} asyncFunction
     * - An asynchronous function that will be called, returning a result in a promise.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(asyncFunction, 5);      
     * Promise.retry(() => asyncFunction(1, 2), 5);   
     * // Retry 5 times with a default delay.
     */
    retry<T>(asyncFunction: AsyncFunction<T>, count: number): Promise<T>;
 
    /**
     * Starts a promise with a given promise that has retry tolerance.
     * 
     * @param {PromiseLike<T>} promise
     * - A promise that holds the result.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(promise, 5);  
     * // Retry 5 times with a default delay.
     */
    retry<T>(promise: PromiseLike<T>, count: number): Promise<T>;
 
    /**
     * Starts a promise with an asynchronous function that has retry tolerance.
     * 
     * @param {AsyncFunction<T>} asyncFunction
     * - An asynchronous function that will be called, returning a result in a promise.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * @param {number} [delay=100]
     * - The time in milliseconds to wait between retries.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(asyncFunction, 5, 1000);    
     * Promise.retry(() => asyncFunction(1, 2), 5, 1000);  
     * // Retry 5 times with a 1-second interval.
     */
    retry<T>(asyncFunction: AsyncFunction<T>, count: number, delay: number): Promise<T>;
 
    /**
     * Starts a promise with a given promise that has retry tolerance.
     * 
     * @param {PromiseLike<T>} promise
     * - A promise that holds the result.
     * @param {number} [count=3]
     * - A positive integer between 0 and 30 indicating the number of retries.
     * @param {number} [delay=100]
     * - The time in milliseconds to wait between retries.
     * 
     * @return {Promise<T>} 
     * The result within a promise after retries.
     * 
     * @example
     * Promise.retry(promise, 5, 1000);  
     * // Retry 5 times with a 1-second interval.
     */
    retry<T>(promise: PromiseLike<T>, count: number, delay: number): Promise<T>;
  }
}

extendProperty(retry,{functionName: 'retry'});