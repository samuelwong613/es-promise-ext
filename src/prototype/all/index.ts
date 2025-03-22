import { extendPrototype } from '../../_helper';
import _all, {ResolvedPromise} from './all';

declare global {
  interface Promise<T> {
    /**
     * Reject with error in the promise chain.
     * 
     * @param {any} reason
     * - the reason of the error
     * 
     * @return {Promise<never>} 
     * The error which throw in the promise
     * 
     * @example
     * Promise.resolve()
     *   .then(reject('a'))
     *   .catch(error => console.error(error))
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