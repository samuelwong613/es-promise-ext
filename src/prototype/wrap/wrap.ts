type CallbackFunction<U extends any[]> = (...args: U) => any
export type WrappedAsyncFunction<U extends any[]> = (callback: CallbackFunction<U>) => any
type WrapFunction<U> = () => Promise<U>;

/**
 * Starts a promise with an asynchronous function that use a callback.
 * 
 * @param {WrappedAsyncFunction<U>} wrappedAsyncFunctionWithCallback
 * - An asynchronous function that will be called, returning a result in callback.
 * 
 * @return {WrapFunction<U>} 
 * The result returned from callback.
 * 
 * @example
 * Promise.resolve().then(wrap(asyncFunction));  
 * // for asyncFunction accepting the callback as 1st parameter
 * 
 * Promise.resolve().then(wrap(cb => asyncFunction(1, 2, cb)));  
 * // for other asyncFunction accepting the callback as the rest parameter
 */
export default function wrap<U extends any[]>(
  wrappedAsyncFunctionWithCallback: WrappedAsyncFunction<U>
): WrapFunction<U> {

	if (typeof wrappedAsyncFunctionWithCallback !== 'function'){
    throw new TypeError('Promise.prototype.wrap parameter 1 must be a function');
  }

	return () => new Promise((resolve) => {
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

