import { extendPrototype } from '../../_helper';
import _allMap from './allMap';

declare global {
  interface Promise<T> {
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
     *   .then(allMap(
     *     new Map(
     *       Object.entries(
     *         {
     *           someNumber: Promise.resolve(1),
     *           someString: Promise.resolve('test'),
     *           someBoolean: Promise.resolve(true)
     *         }
     *       )
     *     )
     *   ))     
     * // return the resolved map in the subsequent promise
     */
     allMap(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>>;
  }
}

function allMap<T>(this: Promise<T>, values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.allMap called on a non-Promise instance');
  
  return (this).then(_allMap(values))
}

extendPrototype(allMap);