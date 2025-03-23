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
 * promiseAllMap( 
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
export default function promiseAllMap(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>> {
  if (!(values instanceof Map))
    throw TypeError('Promise.allMap parameter 1 must be a Map');

  const keys = Array.from(values.keys());
  const promises: Array<Promise<unknown>|unknown> = [];

  for (let key of keys){
    promises.push(values.get(key));
  }

  return Promise.all(promises).then(resolvedPromise => {
    const result = new Map();

    for (let key of keys){
      result.set(key, resolvedPromise.shift())
    }
      
    return result;
  });
}