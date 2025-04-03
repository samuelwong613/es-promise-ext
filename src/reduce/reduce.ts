export interface Option<I> {
  canceller?: { cancelled?: boolean },
  progress?: (subResult: any, step: number, total: number) => any,
  initValue?: I,
};

type Func = (...arg: any) => any
export type AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9> = [] | [(arg: Awaited<I>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => V6, (arg: Awaited<V6>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => V6, (arg: Awaited<V6>) => V7, (arg: Awaited<V7>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => V6, (arg: Awaited<V6>) => V7, (arg: Awaited<V7>) => V8, (arg: Awaited<V8>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => V6, (arg: Awaited<V6>) => V7, (arg: Awaited<V7>) => V8, (arg: Awaited<V8>) => V9, (arg: Awaited<V9>) => R] | 
  [(arg: Awaited<I>) => V0, (arg: Awaited<V0>) => V1, (arg: Awaited<V1>) => V2, (arg: Awaited<V2>) => V3, (arg: Awaited<V3>) => V4, (arg: Awaited<V4>) => V5, (arg: Awaited<V5>) => V6, (arg: Awaited<V6>) => V7, (arg: Awaited<V7>) => V8, (arg: Awaited<V8>) => V9, (arg: Awaited<V9>) => any, ...Func[], (arg: any) => R];

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
 * promiseReduce(
 *   [
 *     () => Promise.resolve(1),
 *     plus(5),
 *     minus(2).
 *   ]
 * )     
 * // return 4 in the subsequent promise
 */
export default async function reduce<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>(asyncFunctions: AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>): Promise<Awaited<R>>;

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
 * promiseReduce(
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
export default async function reduce<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>(asyncFunctions: AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>, option: Option<I>): Promise<Awaited<R>>;

export default async function reduce<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9> (
  asyncFunctions: AsyncFunctions<I,R,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9>,
  option?: Option<I>,
) : Promise<Awaited<R>>
{

  if (!Array.isArray(asyncFunctions)){
    throw new TypeError('Promise.reduce must be called with an async function array');
  }

  const canceller = option?.canceller ?? {};
  const progress = option?.progress ?? function(){};
  const initValue = option?.initValue ?? undefined;
  
  let step = 0;
  let result = initValue;
  for (let asyncFunction of asyncFunctions){
    if (canceller.cancelled === true){
      progress(canceller, step++, asyncFunctions.length);
      continue;
    }

    if (typeof asyncFunction !== 'function')
      throw new TypeError('Promise.reduce must be called with an async function array');

    result = await asyncFunction(result);
    progress(result, step++, asyncFunctions.length);
  }

  return result as unknown as Awaited<R>;
}