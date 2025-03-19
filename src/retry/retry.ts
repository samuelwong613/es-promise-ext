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
 * @return {Promise<T>} 
 * The result within a promise after retries.
 * 
 * @example
 * promiseRetry(asyncFunction, 5, 1000);    
 * promiseRetry(() => asyncFunction(1, 2), 5, 1000);  
 * promiseRetry(promise, 5, 1000);  
 * // Retry 5 times with a 1-second interval.
 */
 export default function retry<T>(
  asyncFunction: AsyncFunction<T> | PromiseLike<T>, 
  count = 3, 
  delay = 100
): Promise<T> {

	if (!(asyncFunction instanceof Promise) && typeof asyncFunction !== 'function')
		throw TypeError('Promise.retry parameter 1 must be an async-function or a Promise');
	
	if (!Number.isInteger(count) || count > 30 || count < 0)
		throw TypeError('Promise.retry parameter 2 must be a positive integer in range 0 ~ 30');

	if (!Number.isInteger(delay) || delay < 0)
		throw TypeError('Promise.retry parameter 3 must be a positive integer');

	return Promise.resolve()
		.then(() => typeof asyncFunction === 'function' ? asyncFunction() : asyncFunction)
		.catch(err => {
			if(count === 0) throw err;

			return new Promise(resolve => setTimeout(resolve, delay))
        .then(()=>retry(asyncFunction, count-1, delay));
		})
}

export type AsyncFunction<T> = () => Promise<T>