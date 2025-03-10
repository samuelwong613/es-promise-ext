import { extendPrototype } from '../_helper';
import _log, {Logger} from './log';

declare global {
  interface Promise<T> {

    /**
     * Logging the value between the promise chain.
     * 
     * @return {Promise<T>} 
     * A value which pass through within a promise
     * 
     * @example
     * Promise.resolve(3)
     *  .log()
     *  .then(doSomething)      
     * // return 3 in a promise, after logging
     */
    log<T>(): Promise<T>;

    /**
     * Logging the value between the promise chain.
     * 
     * @param {Function} [logger=console.log]
     * - a logger; default would be console.log
     * 
     * @return {Promise<T>} 
     * A value which pass through within a promise
     * 
     * @example
     * Promise.resolve(true)
     *  .log(console.warn)
     *  .then(doSomething)      
     * // return true in a promise, after logging
     */
     log<T>(logger?: Logger): Promise<T>;

     /**
     * Logging the value between the promise chain.
     * 
     * @param {Function} [logger=console.log]
     * - a logger; default would be console.log
     * 
     * @param {*}
     * - additional description
     * 
     * @return {Promise<T>} 
     * A value which pass through within a promise
     * 
     * @example
     * Promise.resolve('a')
     *  .log(console.log, "my value:")
     *  .then(doSomething)      
     * // return 'a' in a promise, after logging
     */
    log<T>(logger?: Logger, ...args: any): Promise<T>;
  }
}

function log<T>(this: Promise<T>, logger: Logger = console.log, ...args: any): Promise<T>{

  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.log called on a non-Promise instance');
  
  return (this).then((value:T) => {
    logger(...args, value);
    return value;
  })
}

extendPrototype(log);