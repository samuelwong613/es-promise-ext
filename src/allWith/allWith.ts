import promiseAllWithMap from "./allWithMap";
import promiseAllWithObject from "./allWithObject";

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {Iterable<W | PromiseLike<W>>} values
 * - An iterable of Promises.
 * 
 * @return {Promise<{ [key in keyof W]: Awaited<W[key]>; }>} 
 * A new Promise.
 * 
 * @example
 * promiseAllWith(
 *   new Set([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 *   ])
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default function promiseAllWith<W>(values: Iterable<W | PromiseLike<W>>): Promise<Awaited<W>[]>;

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {U} values
 * - An array of Promises.
 * 
 * @return {Promise<{ [key in keyof U]: Awaited<U[key]>; }>} 
 * A new Promise.
 * 
 * @example
 * promiseAllWith(
 *   [
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 *   ]
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default function promiseAllWith<U extends readonly unknown[] | []>(values: U): Promise<{ [key in keyof U]: Awaited<U[key]>; }>;

/**
 * Creates a Promise that is resolved with an object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {V} values
 * - A object of Promises.
 * 
 * @return {Promise<{ [key in keyof V]: Awaited<V[key]>; }>} 
 * A new Promise.
 * 
 * @example
 * promiseAllWith(
 *   {
 *     someNumber: Promise.resolve(1),
 *     someString: Promise.resolve('test'),
 *     someBoolean: Promise.resolve(true)
 *   }
 * )     
 * // return the resolved object in the subsequent promise
 */
export default function promiseAllWith<V extends Record<string, Promise<unknown>|unknown>>(values: V): Promise<{ [key in keyof V]: Awaited<V[key]>; }>;

/**
 * Creates a Promise that is resolved with a Map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {Map<any, Promise<unknown> | unknown>} values
 * - A map of Promises.
 * 
 * @return {Promise<Map<any, any>>} 
 * A new Promise.
 * 
 * @example
 * promiseAllWith( 
 *   new Map(
 *     Object.entries({
 *       someNumber: Promise.resolve(1),
 *       someString: Promise.resolve('test'),
 *       someBoolean: Promise.resolve(true)
 *     })
 *   )
 * )     
 * // return the resolved map in the subsequent promise
 */
export default function promiseAllWith(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>>; 

export default function promiseAllWith<
  W,
  U extends readonly unknown[] | [], 
  V extends Record<string, Promise<unknown>|unknown>
> ( values: Iterable<W | PromiseLike<W>> | U | V | Map<any, Promise<unknown> | unknown> ) : 
  Promise<Awaited<W>[]> |
  Promise<{ [key in keyof U]: Awaited<U[key]>; }> | 
  Promise<{ [key in keyof V]: Awaited<V[key]>; }> |
  Promise<Map<any, any>> 
{
  if (values instanceof Map)
    return promiseAllWithMap(values);
  else if (values instanceof Array)
    return Promise.all(values as U) as Promise<{ [key in keyof U]: Awaited<U[key]>; }>;
  else if (isIterable(values))
    return Promise.all(values as Iterable<W | PromiseLike<W>>) as Promise<Awaited<W>[]>;
  else if (typeof values === 'object')
    return promiseAllWithObject(values as V);
  
  throw new TypeError('Promise.allWith must be called with either array, map or object');
}

function isIterable(object: any) {
  if (typeof object !== 'object' || object === null || object === undefined) {
    return false;
  }
  return typeof object[Symbol.iterator] === 'function';
}
