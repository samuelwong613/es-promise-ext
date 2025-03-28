import { extendPrototype } from '../../_helper';
import _wrap, { WrappedAsyncFunction } from './wrap';

declare global {
  interface Promise<T> {
    /**
     * Starts a promise with an asynchronous function that use a callback.
     * 
     * @param {WrappedAsyncFunction<U>} wrappedAsyncFunctionWithCallback
     * - An asynchronous function that will be called, returning a result in callback.
     * 
     * @return {Promise<U>} 
     * The result returned from callback.
     * 
     * @example
     * Promise.resolve().wrap(asyncFunction);  
     * // for asyncFunction accepting the callback as 1st parameter
     * 
     * Promise.resolve().wrap(cb => asyncFunction(1, 2, cb));  
     * // for other asyncFunction accepting the callback as the rest parameter
     */
    wrap<U extends any[]>(wrappedAsyncFunctionWithCallback: WrappedAsyncFunction<U>): Promise<U>;
  }
}

function wrap<T, U extends any[]>(
  this: Promise<T>,       
  asyncFunction: WrappedAsyncFunction<U>, 
): Promise<U> {
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.wrap called on a non-Promise instance');

  return this.then(_wrap(asyncFunction));
}

extendPrototype(wrap);