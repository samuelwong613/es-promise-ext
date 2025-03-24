import { extendProperty } from '../_helper';
import allWith from './allWith';

declare global {
  interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {Iterable<W | PromiseLike<W>>} values
     * - An iterable of Promises.
     * 
     * @return {Promise<Awaited<W>[]>} 
     * A new Promise.
     * 
     * @example
     * Promise.allWith(
     *   [
     *     Promise.resolve(1),
     *     Promise.resolve(2),
     *     Promise.resolve(3)
     *   ]
     * )     
     * // return [1,2,3] in the subsequent promise
     */
    allWith<W>(values: Iterable<W | PromiseLike<W>>): Promise<Awaited<W>[]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {U} values
     * - An array of Promises.
     * 
     * @return {Promise<{ [key in keyof U]: Awaited<U[key]>; }>} 
     * A new Promise.
     * 
     * @example
     * Promise.allWith(
     *   [
     *     Promise.resolve(1),
     *     Promise.resolve(2),
     *     Promise.resolve(3)
     *   ]
     * )     
     * // return [1,2,3] in the subsequent promise
     */
    allWith<U extends readonly unknown[] | []>(values: U): Promise<{ [key in keyof U]: Awaited<U[key]>; }>;
    
    /**
     * Creates a Promise that is resolved with an object of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {V} values
     * - A object of Promises.
     * 
     * @return {Promise<{ [key in keyof V]: Awaited<V[key]>; }>} 
     * A new Promise.
     * 
     * @example
     * Promise.allWith(
     *   {
     *     someNumber: Promise.resolve(1),
     *     someString: Promise.resolve('test'),
     *     someBoolean: Promise.resolve(true)
     *   }
     * )     
     * // return the resolved object in the subsequent promise
     */
    allWith<V extends Record<string, Promise<unknown>|unknown>>(values: V): Promise<{ [key in keyof V]: Awaited<V[key]>; }>;
    
    /**
     * Creates a Promise that is resolved with a Map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {Map<any, Promise<unknown> | unknown>} values
     * - A map of Promises.
     * 
     * @return {Promise<Map<any, any>>} 
     * A new Promise.
     * 
     * @example
     * Promise.allWith( 
     *   new Map(
     *     Object.entries({
     *       someNumber: Promise.resolve(1),
     *       someString: Promise.resolve('test'),
     *       someBoolean: Promise.resolve(true)
     *     })
     *   )
     * )     
     * // return the resolved map in the subsequent promise
     */
    allWith(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>>;
  }
}

extendProperty(allWith, {functionName: 'allWith'});