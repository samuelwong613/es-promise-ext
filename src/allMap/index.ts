import { extendProperty } from '../_helper';
import allMap from './allMap';

declare global {
  interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with a map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {Map<any, Promise<unknown> | unknown>} values
     * - A map of Promises.
     * 
     * @return {Promise<Map<any, any>>} 
     * A new Promise.
     * 
     * @example
     * Promise.allMap( 
     *   new Map(
     *     Object.entries(
     *       {
     *         someNumber: Promise.resolve(1),
     *         someString: Promise.resolve('test'),
     *         someBoolean: Promise.resolve(true)
     *       }
     *     )
     *   )
     * )     
     * // return the resolved object in the subsequent promise
     */
     allMap(values: Map<any, Promise<unknown>|unknown>): Promise<Map<any, any>>;
  }
}

extendProperty(allMap, {functionName: 'allMap'});