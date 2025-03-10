/**
 * Start promise after delaying.
 * 
 * @return {Promise<void>} 
 * A void promise
 * 
 * @example
 * promiseDelay(300)
 *   .then(doSomething)  
 * // return a void promise after delay 300 ms
 */
export default function promiseDelay(millisecond: number): Promise<void> {
  if (!Number.isInteger(millisecond) || millisecond < 0)
    throw TypeError('Promise.delay parameter 1 must be a positive integer');

  return new Promise(resolve=>{
    setTimeout(
      ()=>resolve(),
      millisecond
    )
  })
}