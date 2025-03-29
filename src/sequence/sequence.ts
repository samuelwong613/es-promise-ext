export interface Option {
  canceller?: { cancelled?: boolean },
  progress?: (subResult: any, step: number, total: number) => any,
  skipIfError?: boolean
}

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
 * promiseSequence(
 *   [
 *     () => Promise.resolve(1),
 *     () => Promise.resolve(2),
 *     () => Promise.resolve(3)
 *   ]
 * )     
 * // return [1,2,3] in the subsequent promise
 */
export default async function sequence<U extends readonly unknown[] | []> (asyncFunctions: U) :
  Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>;

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
 * promiseSequence(
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
export default async function sequence<U extends readonly unknown[] | []> (asyncFunctions: U, option: Option) :
 Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>;

export default async function sequence<U extends readonly unknown[] | []> (
  asyncFunctions: U,
  option?: Option,
) : 
  Promise<{ [K in keyof U]: U[K] extends (...args: any[]) => infer R ? Awaited<R> : Awaited<U[K]> }>
{

  if (!Array.isArray(asyncFunctions)){
    throw new TypeError('Promise.sequence must be called with an array');
  }

  const canceller = option?.canceller ?? {};
  const progress = option?.progress ?? function(){};
  const skipIfError = option?.skipIfError ?? false;
  
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