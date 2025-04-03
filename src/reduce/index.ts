import {extendProperty} from '../_helper';
import reduce, {Option, AsyncFunctions} from './reduce';

declare global {
  interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved sequentially with a result when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {AsyncFunctions} asyncFunctions
     * - An array of async functions.
     * 
     * @return {Promise<Awaited<R>>} 
     * A new Promise.
     * 
     * @example
     * Promise.reduce(
     *   [
     *     () => Promise.resolve(1),
     *     plus(5),
     *     minus(2).
     *   ]
     * )     
     * // return 4 in the subsequent promise
     */
    reduce<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9> (asyncFunctions: AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>): Promise<Awaited<R>>

    /**
     * Creates a Promise that is resolved sequentially with a result when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {AsyncFunctions} asyncFunctions
     * - An array of async functions.
     * 
     * @param {Option} option
     * - canceller: object.  Set `canceller.cancelled = true` stopping the sequence
     * - progress: `(subResult, step, total) => any`.  To show the progress and the sub result
     * - initValue: any
     * 
     * @return {Promise<Awaited<R>>} 
     * A new Promise.
     * 
     * @example
     * Promise.reduce(
     *   [
     *     plus(5),
     *     minus(2).
     *   ],
     *   {
     *     canceller: { cancelled: false }, 
     *       // set to true later
     *     progress: (subResult, step, total) => 
     *       { 
     *         console.log(subResult) 
     *         console.log(`${((step+1) / total)}%`)
     *       },
     *     initValue: 1
     *   }
     * )     
     * // return 4 in the subsequent promise
     */
     reduce<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9> (asyncFunctions: AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>, option: Option<I>): Promise<Awaited<R>>
  }
}

extendProperty(reduce, {functionName: 'reduce'});