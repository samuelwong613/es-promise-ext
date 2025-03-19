export type func<T> = () => T;

/**
 * Start promise with a function, which Promise.resolve() not supported.
 * 
 * @param {T} value
 * - a value - which would be equivient to Promise.resolve(value)
 * - a function which will be called and pass the result in promise
 * 
 * @return {Promise<T>} 
 * A value within a promise
 * 
 * @example
 * promiseThen(3)      // return 3 in a promise
 * promiseThen(()=>3)  // return 3 in a promise
 */
export default function then<T>(value: T | PromiseLike<T> | func<T>): Promise<T> {
	if (typeof value === 'function')
    return Promise.resolve().then((value as func<T>));
  else
    return Promise.resolve(value);
}