type RejectFunction = () => Promise<never>;

/**
 * Reject with error in the promise chain.
 * 
 * @param {any} reason
 * - the reason of the error
 * 
 * @return {RejectFunction} 
 * The error which throw in the promise
 * 
 * @example
 * Promise.resolve()
 *   .then(reject('a'))
 *   .catch(error => console.error(error))
 */
export default function reject(reason: any): RejectFunction {
  return () => Promise.reject(reason); 
}
