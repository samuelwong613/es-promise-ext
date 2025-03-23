import { extendPrototype } from '../../_helper';
import _allObject, {ResolvedPromise} from './allObject';

declare global {
  interface Promise<T> {
    /**
     * Creates a Promise that is resolved with a object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {T} values
     * - A object of Promises.
     * 
     * @return {AllObjectFunction<T>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .then(allObject(
     *     {
     *       someNumber: Promise.resolve(1),
     *       someString: Promise.resolve('test'),
     *       someBoolean: Promise.resolve(true)
     *     }
     *   ))     
     * // return the resolved object in the subsequent promise
     */
     allObject<U extends Record<string, Promise<unknown>>>(values: U): ResolvedPromise<U>;
  }
}

function allObject<T, U extends Record<string, Promise<unknown>>>(this: Promise<T>, values: U): ResolvedPromise<U>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.allObject called on a non-Promise instance');
  
  return (this).then(_allObject(values))
}

extendPrototype(allObject);