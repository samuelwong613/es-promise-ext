export type ResolvedPromise<T> = Promise<{ [key in keyof T]: Awaited<T[key]>; }>

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
 * promiseAllObject(
 *   {
 *     someNumber: Promise.resolve(1),
 *     someString: Promise.resolve('test'),
 *     someBoolean: Promise.resolve(true)
 *   }
 * ))     
 * // return the resolved object in the subsequent promise
 */
export default function promiseAllObject<T extends Record<string, Promise<unknown>|unknown>>(values: T): ResolvedPromise<T> {
  type KeyOf = keyof typeof values;

  const keys = [...Object.keys(values), ...Object.getOwnPropertySymbols(values)] as KeyOf[];
  const promises = keys.map((key) => values[key]);  

  return Promise.all(promises).then(resolvedPromise => {
    type ResultType = {
      [key in KeyOf]: Awaited<T[key]>
    };

    const result: ResultType = {} as ResultType;
  
    keys.forEach((key, index)=>{
      result[key] = resolvedPromise[index];
    })
    
    return result as ResultType;
  });
}