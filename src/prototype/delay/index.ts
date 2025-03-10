import { extendPrototype } from '../../_helper';
import _delay from './delay';

declare global {
  interface Promise<T> {
    /**
     * Delay between the promise chain.
     * 
     * @param {number} millisecond
     * - a time for the delay
     * 
     * @return {Promise<T>} 
     * A void promise
     * 
     * @example
     * Promise.resolve('a')
     *   .delay(300)
     *   .then(doSomething)       
     * // return 'a' in a promise after delay 300 ms
     */
    delay(millisecond: number): Promise<T>;
  }
}

function delay<T>(this: Promise<T>, millisecond: number): Promise<T>{
  if (!(this instanceof Promise))
    throw TypeError('Promise.prototype.delay called on a non-Promise instance');

  return this.then(_delay(millisecond));
}

extendPrototype(delay);