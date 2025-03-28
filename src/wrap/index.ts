import {extendProperty} from '../_helper';
import wrap, {WrappedAsyncFunction} from './wrap';

declare global {
  interface PromiseConstructor {
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
     * Promise.wrap(asyncFunction);  
     * // for asyncFunction accepting the callback as 1st parameter
     * 
     * Promise.wrap(cb => asyncFunction(1, 2, cb));  
     * // for other asyncFunction accepting the callback as the rest parameter
     */
    wrap<U extends any[]>(wrappedAsyncFunctionWithCallback: WrappedAsyncFunction<U>): Promise<U>;
  }
}

extendProperty(wrap,{functionName: 'wrap'});