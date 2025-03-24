import allWithMap, { AllWithMapFunction } from "./allWithMap";
import allWithObject, { AllWithObjectFunction } from "./allWithObject";
export type AllFunction<U> = () => Promise<{ -readonly [key in keyof U]: Awaited<U[key]> }>

/**
 * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {U} values
 * - An array of Promises.
 * 
 * @return {AllFunction<U>} 
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
export default function all<U extends readonly unknown[] | []>(values: U): AllFunction<U>;

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
  U extends (readonly unknown[] | []),
  V extends (Record<string, Promise<unknown>|unknown>),
>
  ( values: U | V | Map<any, Promise<unknown> | unknown> ) : 
  AllFunction<U> | AllWithMapFunction | AllWithObjectFunction<V>
{
  if (values instanceof Array)
    return () => Promise.all(values);
  else if (values instanceof Map)
    return allWithMap(values);
  else
    return allWithObject(values);
}