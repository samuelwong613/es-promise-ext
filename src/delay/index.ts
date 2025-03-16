import { extendProperty } from '../_helper';
import delay from './delay';

declare global {
  interface PromiseConstructor {

    /**
     * Start promise after delaying.
     * 
     * @param {number} millisecond
     * - a time for the delay
     * 
     * @return {Promise<void>} 
     * A void promise
     * 
     * @example
     * Promise.delay(300)    
     * // return a void promise after delay 300 ms
     */
    delay(millisecond: number): Promise<void>;
  }

}

extendProperty(delay,{functionName: 'delay'});