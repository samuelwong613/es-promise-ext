export interface Option {
  canceller?: { cancelled?: boolean },
  progress?: (subResult: any, step: number, total: number) => any,
  skipIfError?: boolean
}

export type SequenceFunction<U> = () => Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>;

/**
 * Creates a Promise that is resolved sequentially with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
 * 
 * @param {U} asyncFunctions
 * - An array of async functions.
 * 
 * @return {SequenceFunction<U>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve().then(
 *   sequence(
 *     [
 *       () => Promise.resolve(1),
 *       () => Promise.resolve(2),
 *       () => Promise.resolve(3)
 *     ]
 *   )
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default function sequence<U extends readonly unknown[] | []> (asyncFunctions: U): SequenceFunction<U>;

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
 * @return {SequenceFunction<U>} 
 * A new Promise.
 * 
 * @example
 * Promise.resolve().then(
 *   sequence(
 *     [
 *       () => Promise.resolve(1),
 *       () => Promise.resolve(2),
 *       () => Promise.resolve(3)
 *     ],
 *     {
 *       canceller: { cancelled: false }, 
 *         // set to true later
 *       progress: (subResult, step, total) => 
 *         { 
 *           console.log(subResult) 
 *           console.log(`${((step+1) / total)}%`)
 *         },
 *       skipIfError: true
 *     }
 *   )
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default function sequence<U extends readonly unknown[] | []> (asyncFunctions: U, option: Option) : SequenceFunction<U>;

export default function sequence<U extends readonly unknown[] | []> (asyncFunctions: U, option?: Option) : SequenceFunction<U>
{
  if (!Array.isArray(asyncFunctions)){
    throw new TypeError('Promise.prototype.sequence must be called with an array');
  }

  const canceller = option?.canceller ?? {};
  const progress = option?.progress ?? function(){};
  const skipIfError = option?.skipIfError ?? false;

  return async () => {
    const result = [];
    let step = 0;
    for (let asyncFunction of asyncFunctions){
      if (canceller.cancelled === true){
        result.push(canceller);
        progress(canceller, step++, asyncFunctions.length);
        continue;
      }
  
      try{
        const subResult = typeof asyncFunction === 'function'? await asyncFunction() : await asyncFunction;
        result.push(subResult);
        progress(subResult, step++, asyncFunctions.length);
      } catch (error) {
        if (skipIfError === true){
          result.push(error);
          progress(error, step++, asyncFunctions.length);
        }else
          throw error;
      }    
    }
    return result as unknown as { [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> };
  }
}