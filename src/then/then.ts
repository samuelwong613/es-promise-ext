type func<T> = () => T;

/**
 * Start promise with a function, which Promise.resolve() not supported.
 * 
 * @param {T} value
 * - a value: equivient to Promise.resolve(value)
 * - a function, which will be called and pass the value
 * 
 * @return {Promise<T>} 
 * A value within a promise
 * 
 * @example
 * Promise.then(3)      // return 3 in a promise
 * Promise.then(()=>3)  // return 3 in a promise
 */
export default function then<T>(value: T | func<T>): Promise<T> {
	if (typeof value === 'function')
    return Promise.resolve().then((value as func<T>));
  else
    return Promise.resolve(value);
}