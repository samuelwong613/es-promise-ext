import { extendPrototype } from '../../_helper';
import _all, {isIterable} from './all';

declare global {
  interface Promise<T> {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {Iterable<W | PromiseLike<W>>} values
     * - An iterable of Promises.
     * 
     * @return {Promise<Awaited<W>[]>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .all(
     *     new Set([
     *       Promise.resolve(1),
     *       Promise.resolve(2),
     *       Promise.resolve(3)
     *     ])
     *   )     
     * // return [1,2,3] in the subsequent promise
     */
    all<W>(values: Iterable<W | PromiseLike<W>>): Promise<Awaited<W>[]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {U} values
     * - An array of Promises.
     * 
     * @return {Promise<{ -readonly [P in keyof U]: Awaited<U[P]> }>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .all(
     *     [
     *       Promise.resolve(1),
     *       Promise.resolve(2),
     *       Promise.resolve(3)
     *     ]
     *   )     
     * // return [1,2,3] in the subsequent promise
     */
    all<U extends (readonly unknown[] | [])>(values: U): Promise<{ -readonly [key in keyof U]: Awaited<U[key]> }>;

    /**
     * Creates a Promise that is resolved with a map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {Map<any, Promise<unknown> | unknown>} values
     * - A map of Promises.
     * 
     * @return {Promise<Map<any, any>>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .all(
     *     new Map(
     *       Object.entries({
     *         someNumber: Promise.resolve(1),
     *         someString: Promise.resolve('test'),
     *         someBoolean: Promise.resolve(true)
     *       })
     *     )
     *   )    
     * // return the resolved map in the subsequent promise
     */
    all(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>>;

    /**
     * Creates a Promise that is resolved with a object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {V} values
     * - A object of Promises.
     * 
     * @return {Promise<{ [key in keyof V]: Awaited<V[key]>; }>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .all(
     *     {
     *       someNumber: Promise.resolve(1),
     *       someString: Promise.resolve('test'),
     *       someBoolean: Promise.resolve(true)
     *     }
     *   )     
     * // return the resolved object in the subsequent promise
     */
    all<V extends Record<string, Promise<unknown>|unknown>>(values: V): Promise<{ [key in keyof V]: Awaited<V[key]>; }>;
  }
}

function all<
  T, 
  W,
  U extends (readonly unknown[] | []),
  V extends (Record<string, Promise<unknown>|unknown>),
>
(
  this: Promise<T>, 
  values: Iterable<W | PromiseLike<W>> | U | V | Map<any, Promise<unknown> | unknown>,
) : 
  Promise<Awaited<W>[]> |
  Promise<{ -readonly [key in keyof U]: Awaited<U[key]> }> |
  Promise<{ [key in keyof V]: Awaited<V[key]>; }> |
  Promise<Map<any, any>>
{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.all called on a non-Promise instance');

  if (values instanceof Map)
      return (this).then(_all(values)) as Promise<Map<any, any>>;
  else if (values instanceof Array)
    return (this).then(_all(values)) as Promise<{ -readonly [key in keyof U]: Awaited<U[key]> }>;
  else if (isIterable(values))
    return (this).then(_all(values as Iterable<W | PromiseLike<W>>)) as Promise<Awaited<W>[]>;
  else
    return (this).then(_all(values as V)) as Promise<{ [key in keyof V]: Awaited<V[key]>; }>;    
}

extendPrototype(all);