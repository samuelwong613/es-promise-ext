import { extendPrototype } from '../../_helper';
import _all, {ResolvedPromise} from './all';

declare global {
  interface Promise<T> {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {T} values
     * - An array of Promises.
     * 
     * @return {AllFunction<T>} 
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
    all<U extends readonly unknown[] | []>(values: U): ResolvedPromise<U>;
  }
}

function all<T, U extends readonly unknown[] | []>(this: Promise<T>, values: U): ResolvedPromise<U>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.all called on a non-Promise instance');
  
  return (this).then(_all(values))
}

extendPrototype(all);