import { extendProperty } from '../_helper';
import allObject, { ResolvedPromise } from './allObject';

declare global {
  interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with a object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {T} values
     * - A object of Promises.
     * 
     * @return {ResolvedPromise<T>} 
     * A new Promise.
     * 
     * @example
     * Promise.allObject(
     *   {
     *     someNumber: Promise.resolve(1),
     *     someString: Promise.resolve('test'),
     *     someBoolean: Promise.resolve(true)
     *   }
     * ))
     * // return the resolved object in the subsequent promise
     */
     allObject<T extends Record<string, Promise<unknown>|unknown>>(values: T): ResolvedPromise<T>;
  }
}

extendProperty(allObject,{functionName: 'allObject'});