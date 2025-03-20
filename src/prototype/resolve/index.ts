import { extendPrototype } from '../../_helper';
import _resolve from './resolve';

declare global {
  interface Promise<T> {

    /**
     * Resolve the value in the promise chain.
     * 
     * @return {Promise<void>} 
     * A value which pass through within a promise
     * 
     * @example
     * Promise.resolve()
     *   .resolve()
     *   .then(doSomething) 
     */
    resolve(): Promise<void>;

    /**
     * Resolve the value in the promise chain.
     * 
     * @param {U} [value]
     * - the value pass through
     * 
     * @return {Promise<U>} 
     * A value which pass through within a promise
     * 
     * @example
     * Promise.resolve()
     *   .resolve('a')
     *   .then(doSomething)      
     * // return 'a' in the subsequence promise
     */
    resolve<U>(value?: U): Promise<U>;
  }
}

function resolve<T,U>(this: Promise<T>, value?: U): Promise<U|void>{

  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.resolve called on a non-Promise instance');
  
  return (this).then(_resolve(value))
}

extendPrototype(resolve);