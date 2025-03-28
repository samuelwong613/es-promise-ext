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
 * promiseWrap(asyncFunction);  
 * // for asyncFunction accepting the callback as 1st parameter
 * 
 * promiseWrap(cb => asyncFunction(1, 2, cb));  
 * // for other asyncFunction accepting the callback as the rest parameter
 */
export default function wrap<U extends any[]>(
  wrappedAsyncFunctionWithCallback: WrappedAsyncFunction<U>
): Promise<U> {

  if (typeof wrappedAsyncFunctionWithCallback !== 'function'){
    throw new TypeError('Promise.wrap parameter 1 must be a function');
  }

  return new Promise((resolve) => {
    const callback: CallbackFunction<U> = function(...args: U){
      switch(args.length){
        case 0: resolve(undefined as any);   
        break;
        case 1: resolve(args[0]);
        break;
        default: resolve(args);
        break;
      }
    };

    wrappedAsyncFunctionWithCallback(callback);
  })
}

export type CallbackFunction<U extends any[]> = (...args: U) => any
export type WrappedAsyncFunction<U extends any[]> = (callback: CallbackFunction<U>) => any
