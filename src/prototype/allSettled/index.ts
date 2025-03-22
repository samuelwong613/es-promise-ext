import { extendPrototype } from '../../_helper';
import _allSettled, {ResolvedPromise} from './allSettled';

declare global {
  interface Promise<T> {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.
     * 
     * @param {T} values
     * - An array of Promises.
     * 
     * @return {AllFunction<T>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve()
     *   .allSettled(
     *     [
     *       Promise.resolve(1),
     *       Promise.reject(2)
     *     ]
     *   )   
     * // return [{status: 'fulfilled', value: 1},{status: 'rejected', value: 2}] in the subsequent promise
     */
    allSettled<U extends readonly unknown[] | []>(values: U): ResolvedPromise<U>;
  }
}

function allSettled<T, U extends readonly unknown[] | []>(this: Promise<T>, values: U): ResolvedPromise<U>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.allSettled called on a non-Promise instance');
  
  return (this).then(_allSettled(values))
}

extendPrototype(allSettled);