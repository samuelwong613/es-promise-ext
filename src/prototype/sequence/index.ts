import {extendPrototype} from '../../_helper';
import _sequence, {Option} from './sequence';

declare global {
  interface Promise<T> {
    /**
     * Creates a Promise that is resolved sequentially with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {U} asyncFunctions
     * - An array of async functions.
     * 
     * @return {Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve().sequence(
     *   [
     *     () => Promise.resolve(1),
     *     () => Promise.resolve(2),
     *     () => Promise.resolve(3)
     *   ]
     * )     
     * // return [1,2,3] in the subsequent promise
     */
    sequence<U extends readonly unknown[] | []> (asyncFunctions: U): Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>

    /**
     * Creates a Promise that is resolved sequentially with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
     * 
     * @param {U} asyncFunctions
     * - An array of async functions.
     * 
     * @param {Option} option
     * - canceller: object.  Set `canceller.cancelled = true` stopping the sequence
     * - progress: `(subResult, step, total) => any`.  To show the progress and the sub result
     * - skipIfError: boolean
     * 
     * @return {Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>} 
     * A new Promise.
     * 
     * @example
     * Promise.resolve().sequence(
     *   [
     *     () => Promise.resolve(1),
     *     () => Promise.resolve(2),
     *     () => Promise.resolve(3)
     *   ],
     *   {
     *     canceller: { cancelled: false }, 
     *       // set to true later
     *     progress: (subResult, step, total) => 
     *       { 
     *         console.log(subResult) 
     *         console.log(`${((step+1) / total)}%`)
     *       },
     *     skipIfError: true
     *   }
     * )     
     * // return [1,2,3] in the subsequent promise
     */
     sequence<U extends readonly unknown[] | []> (asyncFunctions: U, option: Option): Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>
  }
}

function sequence<T, U extends readonly unknown[] | []>(
  this: Promise<T>,     
  asyncFunctions: U,
  option: Option
): Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }> 
{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.sequence called on a non-Promise instance');

  return this.then(_sequence(asyncFunctions, option));
}

extendPrototype(sequence);