export type Logger = (...data : any[]) => void;
type LoggingFunction<T> = (value: T) => T;

/**
 * Logging the value between the promise chain.
 * 
 * @return {Function<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve(3)
 *   .then(log())
 *   .then(doSomething)      
 * // return 3 in a promise, after logging
 */
 export default function log<T>(): LoggingFunction<T>;

 /**
 * Logging the value between the promise chain.
 * 
 * @param {Function} [logger=console.log]
 * - a logger; default would be console.log
 * 
 * @return {Function<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve(true)
 *   .then(log(console.warn))
 *   .then(doSomething)      
 * // return true in a promise, after logging
 */
export default function log<T>(logger: Logger): LoggingFunction<T>;

/**
 * Logging the value between the promise chain.
 * 
 * @param {Function} [logger=console.log]
 * - a logger; default would be console.log
 * 
 * @param {*}
 * - additional description
 * 
 * @return {Function<T>} 
 * A value which pass through within a promise
 * 
 * @example
 * Promise.resolve('a')
 *   .then(log(console.log, "my value:"))
 *   .then(doSomething)      
 * // return 'a' in a promise, after logging
 */
export default function log<T>(logger: Logger, ...args: any): LoggingFunction<T>;


export default function log<T>(logger: Logger = console.log, ...args: any): LoggingFunction<T> {
  return (value) => {
    logger(...args, value);
    return value;
  } 
}