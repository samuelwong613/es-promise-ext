import allWithMap, { AllWithMapFunction } from "./allWithMap";
import allWithObject, { AllWithObjectFunction } from "./allWithObject";
export type AllWithIterableFunction<W> = () => Promise<Awaited<W>[]>
export type AllWithArrayFunction<U> = () => Promise<{ -readonly [key in keyof U]: Awaited<U[key]> }>

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {Iterable<W | PromiseLike<W>>} values
 * - An iterable of Promises.
 * 
 * @return {AllWithIterableFunction<W>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(all(
 *     new Set([
 *       Promise.resolve(1),
 *       Promise.resolve(2),
 *       Promise.resolve(3)
 *     ])
 *   ))
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default function all<W>(values: Iterable<W | PromiseLike<W>>): AllWithIterableFunction<W>;

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {U} values
 * - An array of Promises.
 * 
 * @return {AllWithArrayFunction<U>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(all(
 *     [
 *       Promise.resolve(1),
 *       Promise.resolve(2),
 *       Promise.resolve(3)
 *     ]
 *   ))     
 * // return [1,2,3] in the subsequent promise
 */
export default function all<U extends readonly unknown[] | []>(values: U): AllWithArrayFunction<U>;

/**
 * Creates a Promise that is resolved with a map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {Map<any, Promise<unknown> | unknown>} values
 * - A map of Promises.
 * 
 * @return {AllWithMapFunction} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(all(
 *     new Map(
 *       Object.entries({
 *         someNumber: Promise.resolve(1),
 *         someString: Promise.resolve('test'),
 *         someBoolean: Promise.resolve(true)
 *       })
 *     )
 *   ))     
 * // return the resolved map in the subsequent promise
 */
export default function all(values: Map<any, Promise<unknown> | unknown>): AllWithMapFunction;

/**
 * Creates a Promise that is resolved with a object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {V} values
 * - A object of Promises.
 * 
 * @return {AllWithObjectFunction<V>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve()
 *   .then(all(
 *     {
 *       someNumber: Promise.resolve(1),
 *       someString: Promise.resolve('test'),
 *       someBoolean: Promise.resolve(true)
 *     }
 *   ))     
 * // return the resolved object in the subsequent promise
 */
export default function all<V extends Record<string, Promise<unknown>|unknown>>(values: V): AllWithObjectFunction<V>;

export default function all<
  W,
  U extends (readonly unknown[] | []),
  V extends (Record<string, Promise<unknown>|unknown>),
>
  ( values: Iterable<W | PromiseLike<W>> | U | V | Map<any, Promise<unknown> | unknown> ) : 
  AllWithIterableFunction<W> | AllWithArrayFunction<U> | AllWithMapFunction | AllWithObjectFunction<V>
{
  if (values instanceof Map)
    return allWithMap(values as Map<any, Promise<unknown> | unknown>);
  else if (values instanceof Array)
    return () => Promise.all(values as U);
  else if (isIterable(values))
    return () => Promise.all(values as Iterable<W | PromiseLike<W>>);
  else
    return allWithObject(values as V);
}

export function isIterable(object: any) {
  if (typeof object !== 'object' || object === null || object === undefined) {
    return false;
  }
  return typeof object[Symbol.iterator] === 'function';
}