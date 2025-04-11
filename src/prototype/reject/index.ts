import { extendPrototype } from '../../_helper';
import _reject from './reject';

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
     *   .reject('a')
     *   .catch(error => console.error(error))
     */
    reject(value: any): Promise<never>;
  }
}

function reject<T>(this: Promise<T>, reason: any): Promise<never>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.reject called on a non-Promise instance');
  
  return (this).then(_reject(reason))
}

extendPrototype(reject);