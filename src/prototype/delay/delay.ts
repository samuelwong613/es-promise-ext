export type DelayFunction<T> = (value: T) => Promise<T>;

/**
 * Delay between the promise chain.
 * 
 * @return {Function<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve(3)
 *   .then(delay(300))
 *   .then(doSomething)  
 * // return 3 in a promise after delay 300 ms
 */
export default function delay<T>(millisecond: number): DelayFunction<T> {
  if (!Number.isInteger(millisecond) || millisecond < 0)
    throw TypeError('Promise.prototype.delay parameter 1 must be a positive integer');

  return (value) => 
    new Promise(resolve=>{
      setTimeout(
        ()=>resolve(value),
        millisecond
      )
    })
}
