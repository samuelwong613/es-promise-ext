import {extendProperty} from '../_helper';
import then from './then';

type func<T> = (...args : any[]) => T;

declare global {
  interface PromiseConstructor {

    /**
     * Start promise with a function, which Promise.resolve() not supported.
     * 
     * @param {T} value
     * - a value - which would be equivient to Promise.resolve(value)
     * - a function which will be called and pass the result in promise
     * 
     * @return {Promise<T>} 
     * A value within a promise
     * 
     * @example
     * Promise.then(3)      // return 3 in a promise
     * Promise.then(()=>3)  // return 3 in a promise
     */
    then<T>(value: T | PromiseLike<T> | func<T>): Promise<T>;
  }
}

extendProperty(then);